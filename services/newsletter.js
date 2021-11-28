const rp = require("request-promise");

const BASE_URL = process.env.NEWSLETTER_HOST + "/api"
// const BASE_URL = "http://localhost:3001/api"

const newsletter = (() => {
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

module.exports = newsletter;
