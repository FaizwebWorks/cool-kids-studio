const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

let accessToken = null;

export class AdminApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
  }
}

export const setAdminAccessToken = (token) => {
  accessToken = token || null;
};

export const getAdminAccessToken = () => accessToken;

const parseResponse = async (response) => {
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new AdminApiError(
      payload?.message || 'Request failed. Please try again.',
      response.status,
    );
  }

  if (payload?.success === false) {
    throw new AdminApiError(payload?.message || 'Request failed.', response.status);
  }

  return payload;
};

const performFetch = (path, { includeCredentials = true, headers = {}, ...fetchOptions } = {}) => fetch(`${API_BASE_URL}${path}`, {
  credentials: includeCredentials ? 'include' : 'same-origin',
  ...fetchOptions,
  headers,
});

const tryRefreshAccessToken = async () => {
  try {
    const response = await performFetch('/auth/refresh', { method: 'POST' });
    const payload = await parseResponse(response);
    const nextAccessToken = extractAccessToken(payload);

    if (nextAccessToken) {
      setAdminAccessToken(nextAccessToken);
      return nextAccessToken;
    }
  } catch {
    setAdminAccessToken(null);
  }

  return null;
};

const request = async (path, options = {}, retryOnAuthFailure = true) => {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers = {
    ...(options.body && !isFormData ? { 'Content-Type': 'application/json' } : null),
    ...(options.headers || {}),
  };
  const { includeCredentials = true, ...fetchOptions } = options;

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await performFetch(path, {
    includeCredentials,
    ...fetchOptions,
    headers,
  });

  if ((response.status === 401 || response.status === 403) && retryOnAuthFailure && path !== '/auth/refresh' && path !== '/auth/login') {
    const nextAccessToken = await tryRefreshAccessToken();

    if (nextAccessToken) {
      return request(path, options, false);
    }
  }

  return parseResponse(response);
};

const extractAccessToken = (payload) => (
  payload?.data?.accessToken
  || payload?.accessToken
  || payload?.data?.token
  || payload?.token
);

const extractUser = (payload) => payload?.data?.user || payload?.data || payload?.user || null;

export const adminAuthApi = {
  async login(credentials) {
    let payload;

    try {
      payload = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      if (error instanceof TypeError) {
        payload = await request('/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          includeCredentials: false,
        });
      } else {
        throw error;
      }
    }

    return {
      accessToken: extractAccessToken(payload),
      user: extractUser(payload),
    };
  },

  async refresh() {
    const payload = await request('/auth/refresh', { method: 'POST' });

    return {
      accessToken: extractAccessToken(payload),
      user: extractUser(payload),
    };
  },

  async logout() {
    await request('/auth/logout', { method: 'POST' });
  },

  async me() {
    const payload = await request('/auth/me');
    return extractUser(payload);
  },

  async changePassword(values) {
    const payload = await request('/auth/change-password', {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    return payload.data;
  },
};

export const adminBookingsApi = {
  async list(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();
    const payload = await request(`/bookings${query ? `?${query}` : ''}`);
    const data = payload.data;

    if (Array.isArray(data)) {
      return {
        items: data,
        pagination: {
          page: Number(params.page || 1),
          limit: Number(params.limit || data.length || 10),
          total: data.length,
          totalPages: 1,
        },
      };
    }

    return {
      items: data?.items || data?.bookings || data?.docs || [],
      pagination: data?.pagination || {
        page: data?.page || Number(params.page || 1),
        limit: data?.limit || Number(params.limit || 10),
        total: data?.total || data?.totalDocs || 0,
        totalPages: data?.totalPages || data?.pages || 1,
      },
    };
  },

  async get(id) {
    const payload = await request(`/bookings/${id}`);
    return payload.data;
  },

  async update(id, values) {
    const payload = await request(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    return payload.data;
  },

  async updateStatus(id, values) {
    const payload = await request(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    return payload.data;
  },

  async remove(id) {
    const payload = await request(`/bookings/${id}`, { method: 'DELETE' });
    return payload.data;
  },
};

const normalizeListData = (data) => {
  if (Array.isArray(data)) {
    return {
      items: data,
      pagination: {
        page: 1,
        limit: data.length,
        total: data.length,
        totalPages: 1,
      },
    };
  }

  return {
    items: data?.items || data?.services || data?.docs || [],
    pagination: data?.pagination || {
      page: data?.page || 1,
      limit: data?.limit || data?.items?.length || data?.services?.length || 10,
      total: data?.total || data?.totalDocs || data?.items?.length || data?.services?.length || 0,
      totalPages: data?.totalPages || data?.pages || 1,
    },
  };
};

const normalizeGalleryListData = (data) => {
  if (Array.isArray(data)) {
    return {
      items: data,
      pagination: {
        page: 1,
        limit: data.length,
        total: data.length,
        totalPages: 1,
      },
    };
  }

  return {
    items: data?.items || data?.galleryItems || data?.gallery || data?.docs || [],
    pagination: data?.pagination || {
      page: data?.page || 1,
      limit: data?.limit || data?.items?.length || data?.galleryItems?.length || data?.gallery?.length || 10,
      total: data?.total || data?.totalDocs || data?.items?.length || data?.galleryItems?.length || data?.gallery?.length || 0,
      totalPages: data?.totalPages || data?.pages || 1,
    },
  };
};

export const adminServicesApi = {
  async list(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();
    const payload = await request(`/services/admin/all${query ? `?${query}` : ''}`);
    return normalizeListData(payload.data);
  },

  async create(values) {
    const payload = await request('/services', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    return payload.data;
  },

  async update(id, values) {
    const payload = await request(`/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    return payload.data;
  },

  async updateStatus(id, isActive) {
    const payload = await request(`/services/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
    return payload.data;
  },

  async updateCoverImage(id, file) {
    const formData = new FormData();
    formData.append('image', file);

    const payload = await request(`/services/${id}/cover-image`, {
      method: 'PATCH',
      body: formData,
    });
    return payload.data;
  },

  async remove(id) {
    const payload = await request(`/services/${id}`, { method: 'DELETE' });
    return payload.data;
  },
};

export const adminUploadsApi = {
  async uploadImage(file, context = 'general') {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('context', context);

    const payload = await request('/uploads/images', {
      method: 'POST',
      body: formData,
    });
    return payload.data;
  },

  async listImages(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();
    const payload = await request(`/uploads/images${query ? `?${query}` : ''}`);
    return normalizeListData(payload.data);
  },
};

export const adminGalleryApi = {
  async list(params = {}) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();
    const payload = await request(`/gallery/admin/all${query ? `?${query}` : ''}`);
    return normalizeGalleryListData(payload.data);
  },

  async create(values) {
    const payload = await request('/gallery', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    return payload.data;
  },

  async update(id, values) {
    const payload = await request(`/gallery/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
    return payload.data;
  },

  async updateStatus(id, isActive) {
    const payload = await request(`/gallery/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
    return payload.data;
  },

  async remove(id) {
    const payload = await request(`/gallery/${id}`, { method: 'DELETE' });
    return payload.data;
  },
};
