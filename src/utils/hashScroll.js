const normalizeHash = (hash) => {
  if (!hash || typeof hash !== 'string') return '';
  return hash.startsWith('#') ? hash : `#${hash}`;
};

const resolveTargetId = (rawId) => {
  if (!rawId) return '';
  return rawId;
};

export const scrollToHashTarget = async (
  hash,
  { behavior = 'smooth', maxAttempts = 12, retryDelay = 80 } = {},
) => {
  const normalized = normalizeHash(hash);
  if (!normalized) return false;

  const rawId = decodeURIComponent(normalized.slice(1)).trim();
  const targetId = resolveTargetId(rawId);
  if (!targetId) return false;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior, block: 'start' });
      return true;
    }
    // Wait a bit for lazy-loaded sections/components to mount.
    await new Promise((resolve) => setTimeout(resolve, retryDelay));
  }

  return false;
};

export const toHashPath = (hash, pathname = '/') => {
  const normalized = normalizeHash(hash);
  return normalized ? `${pathname}${normalized}` : pathname;
};
