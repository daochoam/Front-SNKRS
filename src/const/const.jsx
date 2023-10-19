// export const URL_SNKRS_FRONT = 'http://localhost:5173'
export const URL_SNKRS_FRONT = 'https://snkrs-front.vercel.app/'

// export const URL_SNKRS = 'http://localhost:3001'
export const URL_SNKRS = 'https://snkrs-29bl.onrender.com'

export const SESSION_NAME = 'snkrs-session'
export const SESSION_TIME = 30; // 30 minutos
export const SESSION_NOT_COOKIE = '/home'

export const SIGNUP_STORAGE = 'snkrs-signup'
export const PAYMENT_STORAGE = 'snkrs-payment'
export const PRODUCT_STORAGE = 'snkrs-product'
export const TROLLEY_STORAGE = 'snkrs-trolley'

export const GENDER = ['men', 'women', 'kids']

const MIN_YEARS_OLD = 18
const MAX_YEARS_OLD = 120

const fechaMin = new Date()
const fechaMax = new Date()
fechaMin.setFullYear(fechaMin.getFullYear() - MAX_YEARS_OLD)
fechaMax.setFullYear(fechaMax.getFullYear() - MIN_YEARS_OLD)
export const MIN_YEAR_REGISTER = fechaMin.toISOString().split('T')[0];
export const MAX_YEAR_REGISTER = fechaMax.toISOString().split('T')[0];
