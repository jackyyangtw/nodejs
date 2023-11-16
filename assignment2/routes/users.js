const path = require("path");
const router = require("express").Router();
const rootDir = require("../utils/path");

router.get("/users", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "users.html"));
});

module.exports = router;
