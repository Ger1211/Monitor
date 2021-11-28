const monitorMod = require("./monitor");
const { InvalidBodyError } = require("./errors/exceptions");
let monitor;

function getMonitor() {
  if(monitor === undefined) {
    monitor = new monitorMod.Monitor();
  }
  return monitor;
}

let express = require("express");
let app = express();
let router = express.Router();
let port = process.env.PORT || 3004;
app.use(express.json());

router
  .post("/turnOnOff", (req, res) => {
    const status = getMonitor().turnOnOff();
    res.status(201).send({ status: status });
  })
  .get("/services", (req,res) => {
    const services = getMonitor().statusServices();
    res.status(200).send(services);
  })
  .get("/getStatus", (req, res) => {
    let statusApp = "";
    if (getMonitor().getStatus()) {
      statusApp = "Enabled";
    } else {
      statusApp = "Disabled";
    }
    res.status(201).send({ status: statusApp });
  });

function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError || err instanceof InvalidBodyError) {
    return res.status(400).send({ status: 400, errorCode: "BAD_REQUEST" });
  } else {
    next(err);
  }
}

app.use("/api", router);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Port ${port} listening`);
  if (getMonitor().getStatus()) {
    getMonitor().startMonitoring();
  }
});
