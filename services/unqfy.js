const rp = require("request-promise");

// const BASE_URL = process.env.UNQFY_HOST + "/api"
const BASE_URL = "http://localhost:8080/api"

const unqfy = (() => {

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

module.exports = unqfy;