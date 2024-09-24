const cors = require("cors");
const express = require('express');
const app = require('./src/app');
require('dotenv').config();
const apiKeyValidator = require('./src/middleware/apikey-validator');
const { errorHandler } = require("./src/middleware/error-handler");

const server = express();
let allowedOrigins = process.env.ALLOW_ORIGINS || "__ALLOW_ORIGINS__";
server.use(
  cors({
    origin: allowedOrigins.split(",").map((origin) => origin.trim()),
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "adegum-api-key"],
  })
);
server.use(apiKeyValidator);
// server.use(errorHandler);
server.use('/__ADEGUM__' , app);

const port = process.env.PORT || '__PORT__';
server.listen(port, () => {
  console.log(`vSep.16 - Server is running on port ${port}`);
});