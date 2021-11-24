const picklify = require("picklify");
const fs = require("fs");

class Monitor {
  constructor() {
    this.enabled = true;
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
