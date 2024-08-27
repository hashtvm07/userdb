const express = require('express');
const app = require('./src/app');


const server = express();
server.use('/', app);

const port = process.env.PORT || 5020;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});