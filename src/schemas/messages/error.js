export const ERRORS = {
  REQUIRED: (context) => ({ message: `${context} is required` }),
  MAX: (context, n) => ({ message: `${context} must be less than ${n}` }),
  MIN: (context, n) => ({ message: `${context} must be at least ${n}` }),
  INVALID: (context) => ({ message: `${context} is invalid` }),
  AFTER_DATE: (date) => ({ message: `Date must be after ${date}` })
}
