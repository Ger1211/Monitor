const rp = require("request-promise");
const logging = (() => {

  function check() {
    const options = {
      url: `http://localhost:3002/api/status`,
    };
    return rp.get(options);
  }

  return {
    check: check,
  };
})();

module.exports = logging;