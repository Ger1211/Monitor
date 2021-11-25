const rp = require("request-promise");
const newsletter = (() => {
  function check() {
    const options = {
      url: `http://localhost:3001/api/status`,
    };
    return rp.get(options);
  }

  return {
    check: check,
  };
})();

module.exports = newsletter;
