import { phone } from 'phone'
export const isPhoneNumber = (number, country) => {
  const { isValid } = phone(number, { country })
  return isValid
}
