export const isValidDate = str => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (str.match(dateRegex) != null && str.match(dateRegex).length > 0 && str.length === 10)
    return true;
  return false;
};
