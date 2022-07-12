const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// router.get("/new-page", (req, res) => {
//   // res.sendFile("./views/index.html", { root: __dirname });
//   res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
// });

module.exports = router;
