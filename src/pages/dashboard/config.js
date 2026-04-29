import {
  CalendarBlank,
  Clock,
  GearSix,
  GridFour,
  Image,
  ListChecks,
  Lock,
  Package,
  Star,
  Storefront,
} from 'phosphor-react';

export const SERVICES = ['Newborn', 'Maternity', 'Birthday', 'Wedding', 'Portrait', 'Fashion'];

export const STATUSES = ['pending', 'confirmed', 'rescheduled', 'completed', 'cancelled'];

export const cmsModules = [
  {
    title: 'Services CMS',
    path: 'services',
    icon: Storefront,
    description: 'Manage service names, descriptions, covers, order, and active states.',
  },
  {
    title: 'Packages CMS',
    path: 'packages',
    icon: Package,
    description: 'Manage package price, duration, features, badges, and service mapping.',
  },
  {
    title: 'Availability Settings',
    path: 'availability',
    icon: Clock,
    description: 'Control timezone, working hours, closed days, buffers, and booking limits.',
  },
  {
    title: 'Blocked Slots',
    path: 'blocked-slots',
    icon: CalendarBlank,
    description: 'Create manual blocks for holidays, events, maintenance, and off days.',
  },
  {
    title: 'Gallery CMS',
    path: 'gallery',
    icon: Image,
    description: 'Curate project images, categories, alt text, order, and visibility.',
  },
  {
    title: 'Testimonials CMS',
    path: 'testimonials',
    icon: Star,
    description: 'Review, publish, and reorder client testimonials.',
  },
  {
    title: 'Site Settings',
    path: 'site-settings',
    icon: GearSix,
    description: 'Update hero copy, contact info, social links, footer, and admin email.',
  },
];

export const navGroups = [
  {
    label: 'Operate',
    items: [
      { label: 'Overview', to: '/dashboard', icon: GridFour, end: true },
      { label: 'Bookings', to: '/dashboard/bookings', icon: ListChecks },
    ],
  },
  {
    label: 'Content',
    items: cmsModules.map((module) => ({
      label: module.title.replace(' CMS', ''),
      to: `/dashboard/${module.path}`,
      icon: module.icon,
    })),
  },
  {
    label: 'Admin',
    items: [
      { label: 'Settings', to: '/dashboard/settings', icon: Lock },
    ],
  },
];
