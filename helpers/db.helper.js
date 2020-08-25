const mongoose = require('mongoose');
const logger = require('./logger.helper');

exports.connectMongoDB = (config) => {
    let dbUrl;
    let dbConf = {
        "hostname": config.MONGO.hostname,
        "port": config.MONGO.port,
        "username": config.MONGO.username,
        "password": config.MONGO.password,
        "replicaSet": config.MONGO.replicaSet,
        "dbName": config.MONGO.dbName
    };
    if ((dbConf.username != undefined || dbConf.password != undefined) && (dbConf.username != '' || dbConf.password != '')) {
        dbUrl = `mongodb://${dbConf.username}:${dbConf.password}@${dbConf.hostname}:${dbConf.port}/${dbConf.dbName}`;
        if (dbConf.replicaSet && dbConf.replicaSet != '') {
            dbUrl += `?replicaSet=${dbConf.replicaSet}`;
        }
        mongoose.connect(dbUrl, {
            "auth": { "authSource": "admin" },
            "useNewUrlParser": true,
            "useUnifiedTopology": true,
            'useCreateIndex': true,
            'useFindAndModify': false
        });

    } else {
        dbUrl = `mongodb://${dbConf.hostname}:${dbConf.port}/${dbConf.dbName}`;
        mongoose.connect(dbUrl, {
            "useNewUrlParser": true,
            "useUnifiedTopology": true,
            'useCreateIndex': true,
            'useFindAndModify': false
        });
    }
    mongoose.connection.once('open', () => {
        logger.info("Connected to MongoDB Successfully.");
    });
    mongoose.connection.on('connected', () => {
        logger.info('MongoDB connected');
    });
    mongoose.connection.on('disconnected', () => {
        logger.error("Mongodb is disconnected");
    });
    mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected');
    });
    mongoose.connection.on('error', (error) => {
        logger.error(`MongoDB error :: ${error}`);
    });
};