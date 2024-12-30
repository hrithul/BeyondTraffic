require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/athRoutes');
const organizationRoutes = require('./src/routes/organizationRoutes');
const regionRoutes = require('./src/routes/regionRoutes');
const storeRoutes = require('./src/routes/storeRoutes');
const deviceRoutes = require('./src/routes/deviceRoutes');
const metricsRoutes = require('./src/routes/metricsRoutes');
const cron = require("node-cron");
const fetchJsonFromFTP = require("./src/services/ftpService");
const saveToMongo = require("./src/utils/saveToMongo");
const bodyParser = require("body-parser");

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Mongo_URI = process.env.DB_CONNECTION;
// Database connection
mongoose
  .connect(Mongo_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));


fetchJsonFromFTP(saveToMongo);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/region', regionRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/metrics', metricsRoutes);


// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});