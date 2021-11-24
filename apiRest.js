const fs = require("fs"); 
const monitorMod = require("./monitor"); 

function getMonitor(filename = "data.json") {
  let monitor = new monitorMod.Monitor();
  if (fs.existsSync(filename)) {
    monitor = monitorMod.Monitor.load(filename);
  }
  return monitor;
}

let express = require("express");
let app = express();
let router = express.Router();
let port = process.env.PORT || 3004;
app.use(express.json());

router
  .get("/", function (req, res) {
    res.status(200);
    res.json({ message: "hooray! welcome to our API" });
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
  app.listen(port, () => console.log(`Port ${port} listening`));
