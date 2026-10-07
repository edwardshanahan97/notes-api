const isValidId = (id) => {
  const number = Number(id);
  return Number.isInteger(number) && number > 0;
};

export default isValidId;
