const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");

const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// cors
app.use(cors(corsOptions));

// build  in middleware to handler erlencode data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// buildt-in middleware for json
app.use(express.json());

// server static files
// buat bac file di public
app.use(express.static(path.join(__dirname, "/public")));

// routing root
app.use("/", require("./routes/root"));
// routing register
app.use("/register", require("./routes/api/register"));
// routing login
app.use("/auth", require("./routes/api/auth"));
// routing employee
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
