const rp = require("request-promise");
const credentials = require("../credentials.json");
const discord = (() => {

  function sendInfo(content) {
    const options = {
      url: `https://discord.com/api/webhooks/${credentials.webhook}/${credentials.token}`,
      body: content,
      json: true
    };
    return rp.post(options);
  }

  return {
    sendInfo: sendInfo,
  };
})();

module.exports = discord;