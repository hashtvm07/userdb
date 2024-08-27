const express = require('express');
const { companyRoutes } = require('./routes/company-routes');
const { ersaRoutes } = require('./routes/ersa-routes');
const { logRoutes } = require('./routes/log-routes');
const app = express();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('running from poc12..');
});
app.use("/api/company", companyRoutes);
app.use("/api/ersa", ersaRoutes);
app.use("/api/log", logRoutes);
// app.post('/api/data', (req, res) => {
//   const { name, email } = req.body;
//   res.json({ message: `Received data: Name: ${name}, Email: ${email}` });
// });

module.exports = app;