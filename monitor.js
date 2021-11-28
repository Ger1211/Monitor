const unqfy = require("./services/unqfy");
const logging = require("./services/logging");
const newsletter = require("./services/newsletter");
const discord = require("./services/discord");
const moment = require("moment");
class Monitor {
  constructor() {
    this.enable = true;
    this.unqfy = false;
    this.logging = false;
    this.newsletter = false;
  }

  getStatus() {
    return this.enable;
  }

  statusServices() {
    return {
      UNQfy: this.unqfy ? "UP" : "DOWN",
      Newsletter: this.newsletter ? "UP" : "DOWN",
      Logging: this.logging ? "UP" : "DOWN",
    };
  }

  turnOnOff() {
    let status;
    if (this.enable) {
      this.enable = false;
      status = "Off";
    } else {
      this.enable = true;
      status = "On";
      this.startMonitoring();
    }
    return status;
  }

  startMonitoring() {
    this.monitoringUnqfy();
    this.monitoringLogging();
    this.monitoringNewsletter();
  }

  monitoringUnqfy() {
    if (this.enable) {
      this.monitorUnqfy();
      setTimeout(this.monitoringUnqfy.bind(this), 2000);
    }
  }
  monitoringLogging() {
    if (this.enable) {
      this.monitorLogging();
      setTimeout(this.monitoringLogging.bind(this), 2000);
    }
  }
  monitoringNewsletter() {
    if (this.enable) {
      this.monitorNewsletter();
      setTimeout(this.monitoringNewsletter.bind(this), 2000);
    }
  }

  monitorUnqfy() {
    unqfy
      .check()
      .then(() => {
        if (!this.unqfy) {
          this.unqfy = true;
          this.notifyDiscordUp("UNQfy");
        }
      })
      .catch(() => {
        if (this.unqfy) {
          this.unqfy = false;
          this.notifyDiscordDown("UNQfy");
        }
      });
  }
  monitorLogging() {
    logging
      .check()
      .then(() => {
        if (!this.logging) {
          this.logging = true;
          this.notifyDiscordUp("Logging");
        }
      })
      .catch(() => {
        if (this.logging) {
          this.logging = false;
          this.notifyDiscordDown("Logging");
        }
      });
  }
  monitorNewsletter() {
    newsletter
      .check()
      .then(() => {
        if (!this.newsletter) {
          this.newsletter = true;
          this.notifyDiscordUp("Newsletter");
        }
      })
      .catch(() => {
        if (this.newsletter) {
          this.newsletter = false;
          this.notifyDiscordDown("Newsletter");
        }
      });
  }

  notifyDiscordUp(service) {
    discord.sendInfo({
      content: `[${moment().format(
        "HH:mm:SS"
      )}] El servicio ${service} ha vuelto a la normalidad`,
    });
  }

  notifyDiscordDown(service) {
    discord.sendInfo({
      content: `[${moment().format(
        "HH:mm:SS"
      )}] El servicio ${service} ha dejado de funcionar`,
    });
  }
}

module.exports = {
  Monitor: Monitor,
};
