const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config/config');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const fs = require('fs');
const mkdirp = require('mkdirp');
const logger = require('./logger.helper');

exports.appMiddleware = (app) => {
    
    //Creating dependent folders
    mkdirp.sync(`${config.LogStreamFilePath}`);
    let accessLogStream = fs.createWriteStream(`${config.LogStreamFilePath}${'access.log'}`, { flags: 'a' });

    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }, { flags: 'a' }))

    // request/response headers
    app.use((req, res, next) => {
        logger.info(`Incoming request from ${req.headers.host} and requested for ${req.url}`)
        req.setTimeout(100000); //10 secs
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', ['POST', 'GET']);
        res.setHeader('Access-Control-Allow-Header', ['X-Requested-With', 'content-type', 'Authorization']);
        res.setTimeout(300000, function () {
            logger.error(`Request has timed out.`);
            res.status(408).json({ success: false, message: "Request has timed out." });
        });
        next();
    });
    app.use(cors());
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard());
    app.use(helmet.hidePoweredBy());

    // Add swagger api-docs
    const swaggerDocument = require('../swagger.json');
    const options = { 
        customCss: '.swagger-ui .topbar { display: none }'
    };
    app.use(`${config.API_BASE}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

    return app;
}
