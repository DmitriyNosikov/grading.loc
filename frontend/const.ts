// ROUTES
export const AppRoute = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PRODUCTS: '/products',
  ADD_PRODUCT: '/add-product',
  EDIT_PRODUCT: '/edit-product',
  PAGE_404: '/page404',
} as const;

// STATE NAMESPACES
export const Namespace = {
  MAIN: 'MAIN',
  PRODUCT: 'PRODUCT',
  USER: 'USER',
} as const;

// USER AUTH STATUSES
export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
} as const;

// API REQUEST STATUSES
export const SEND_DATA_STATUS = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
} as const;
