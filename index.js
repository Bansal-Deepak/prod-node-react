const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();

let { PORT, NODE_ENV } = process.env;
const port = PORT || 5000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});
const { router: onlyRouter } = require("./routes");
app.use(onlyRouter);
// THIS MIDDLEWARE WILL INFORM THE EXPRESS TO USE BUILD CREATED BY CREATE-REACT-APP
// ONLY FOR PRODUCTION AND STAGING
if (NODE_ENV == "production" || NODE_ENV == "staging") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
// IF ENV IS NOT PRODUCTION OR STAGING, THIS API WILL BE FIRED,BASICALLY,IN TESTING
// OR DEVELOPMENT WHERE BUILD WILL NOT BE SERVED.
app.get("*", (req, res) => {
  res.status(200).send({ msg: "Catch All Requests" });
});
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
