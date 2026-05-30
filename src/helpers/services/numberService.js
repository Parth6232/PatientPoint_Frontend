const numberService = {};

numberService.toLocaleString = (number) => {
  if (number) {
    return number.toLocaleString();
  }
  return number;
};

export { numberService };
