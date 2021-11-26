const picklify = require("picklify");
const fs = require("fs");
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


  getStatus(){
    return this.enable
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
    this.save("data.json");
    return status;
  }

  startMonitoring() {
    this.monitoringUnqfy();
    setInterval(this.monitoringUnqfy, 6000);  //6 segundos
    //this.monitoringLogging();
    //this.monitoringNewsletter();
    //this.monitoringUnqfy();
  }

  monitoringUnqfy() {
    if (this.enable) {
      this.monitorUnqfy();
    }
  }
  monitoringLogging() {
    if (this.enable) {
      this.monitorLogging();
      setInterval(this.monitorLogging, 60000);
    }
  }
  monitoringNewsletter() {
    if (this.enable) {
      this.monitorNewsletter();
      setInterval(this.monitorNewsletter, 60000);
    }
  }

  monitorUnqfy() {
    unqfy
      .check()
      .then(() => {
        if (!this.unqfy) {
          this.unqfy = true;
          this.notifyDiscordUp("UNQfy")
          this.save("data.json");
        }
      })
      .catch(() => {
        if (this.unqfy) {
          this.unqfy = false;
          this.notifyDiscordDown("UNQfy");
          this.save("data.json");
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
          this.save("data.json");
        }
      })
      .catch(() => {
        if (this.logging) {
          this.logging = false;
          this.notifyDiscordDown("Logging");
          this.save("data.json");
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
          this.save("data.json");
        }
      })
      .catch(() => {
        if (this.newsletter) {
          this.newsletter = false;
          this.notifyDiscordDown("Newsletter");
          this.save("data.json");
        }
      });
  }

  notifyDiscordUp(service) {
    discord.sendInfo({
      content: `[${moment().format("HH:mm:SS")}] El servicio ${service} ha vuelto a la normalidad`,
    });
  }

  notifyDiscordDown(service) {
    discord.sendInfo({
      content: `[${moment().format("HH:mm:SS")}] El servicio ${service} ha dejado de funcionar`,
    });
  }

  save(filename) {
    const serializedData = picklify.picklify(this);
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, { encoding: "utf-8" });
    const classes = [Monitor];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

module.exports = {
  Monitor: Monitor,
};
