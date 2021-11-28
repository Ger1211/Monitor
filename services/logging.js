const rp = require("request-promise");

const BASE_URL = process.env.LOGGING_HOST + "/api"
// const BASE_URL = "http://localhost:3002/api"

const logging = (() => {

  function check() {
    const options = {
      url: `${BASE_URL}/status`,
    };
    return rp.get(options);
  }

  return {
    check: check,
  };
})();

module.exports = logging;