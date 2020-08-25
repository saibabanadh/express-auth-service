// Add module dependencies
const express = require('express');

// Add custom dependencies 
const config = require('./config/config');
const dbHelper = require('./helpers/db.helper');
const appHelper = require('./helpers/app.helper');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const logger = require('./helpers/logger.helper');

const app = express();
appHelper.appMiddleware(app);
dbHelper.connectMongoDB(config);

// Add service routes
app.get(`${config.API_BASE}/`, (req,res)=>{
    return res.status(200).json({
        message:"Success.!, Auth Service is Running.!"
    })
});
app.use(`${config.API_BASE}/auth`, authRoutes);
app.use(`${config.API_BASE}/users`, userRoutes);

// Hanlde uncaughtExceptions here to prevent termination
process.on('uncaughtException', (error) => {
    logger.error(error);
});

// Run the microservice
app.listen(config.PORT, () => {
	logger.info(`${config.APP} is running on ${config.PORT} Port`);
});
