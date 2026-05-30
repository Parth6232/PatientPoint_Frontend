const promiseHelper = {};

promiseHelper.sleep = async (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
};

export { promiseHelper };
