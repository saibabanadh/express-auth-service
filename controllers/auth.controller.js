const jwt = require("jsonwebtoken");
const UserModel = require('../models/user.model');
const passwordHelper = require('../helpers/password.helper');
const config = require("../config/config");

exports.login = async (req, res)=>{
    try{
        const payload = req.body;
        const userExists = await UserModel.findOne({ email: payload.email });
        if(userExists){
            const isPasswordCorrect = passwordHelper.verifyPassword(payload.password, userExists.password);
            if(isPasswordCorrect){
                let token = jwt.sign({
                    userName: userExists.userName,
                    firstName: userExists.firstName,
                    lastName: userExists.lastName
                }, config.JWT_SECRET, { expiresIn:config.JWT_EXPIRES_IN});
                return res.status(200).json({
                    message: "success",
                    token: token
                });
            }else{
                return res.status(401).json({
                    message: "Incorrect password!"
                });
            }
        }else{
            return res.status(404).json({
                message: "User not exists!"
            });
        }
    }catch(error){
        return {
            message: "Ooops!, Internal server error",
            error: error
        };
    }
};
