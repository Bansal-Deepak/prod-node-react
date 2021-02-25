const router = require("express").Router();

router.get("/say", (req, res) => {
  res.status(200).send({ msg: "Hello from server" });
});
module.exports = {
  router,
};
