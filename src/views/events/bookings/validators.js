
export const nameValidator = (name) => {
  return !(/^[a-zA-Z\s]*$/.test(name))
}

export const emailValidator = (email) => {
  const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return !regexp.test(email)
}

export const numOfSeatsValidator = (selected,available) => {
  return selected > available
}
