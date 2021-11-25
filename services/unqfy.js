const rp = require("request-promise");
const unqfy = (() => {

  function check() {
    const options = {
      url: `http://localhost:8080/api/status`,
    };
    return rp.get(options);
  }

  return {
    check: check,
  };
})();

module.exports = unqfy;