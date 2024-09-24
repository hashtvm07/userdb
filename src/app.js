require("dotenv").config();
const connectDB = require("./config/database");
const express = require("express");
const { companyRoutes } = require("./routes/company-routes");
const { userRoutes } = require("./routes/user-routes");
const { ersaRoutes } = require("./routes/ersa-routes");
const { logRoutes } = require("./routes/log-routes");
const app = express();

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "api is running. vSep.16" });
});
app.use("/api/company", companyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ersa", ersaRoutes);
app.use("/api/log", logRoutes);

module.exports = app;
