const express = require("express");
const logger = require("morgan");
const cors = require("cors");


const authRouter = require("./routes/api/authRouter")
const contactsRouter = require("./routes/api/contactsRouter")

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/auth", authRouter)
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Server error",
  });
});

module.exports = app;