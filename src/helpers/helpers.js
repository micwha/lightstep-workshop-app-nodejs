const delay = (max = 2000) =>
  new Promise((res) => setTimeout(res, Math.random() * (max - 1) + 1));

const response = (status_code, msg) => {
  return {
    status_code: status_code,
    message: msg,
  };
};

module.exports = { delay, response };
