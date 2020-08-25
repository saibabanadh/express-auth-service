const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
    if (['', undefined].includes(req.headers.authorization)) {
        res.status(401).json({
            "msg":"You are not authorized, token is missing!"
        });
    } else {
        try{
            let bearerToken = req.headers.authorization;
            jwt.verify(bearerToken, config.JWT_SECRET, function (err, decoded) {
                if (err) { 
                    res.status(401).json({
                        "msg":"You are not authorized"
                    });
                } else {
                    next();
                }
            });
        }catch(error){
            return {
                message: "Ooops!, authentication error",
                error: error
            };
        }
    }
  }