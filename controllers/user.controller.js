const UserModel = require('../models/user.model');
const passwordHelper = require('../helpers/password.helper');

exports.createUser = async (req, res) => {
    try {
        let payload = req.body;
        let user = await UserModel.findOne({email:payload.email});
        if(!user){
            let newUser = new UserModel({
                userName: payload.userName,
                password: passwordHelper.hashPassword(payload.password),
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email
            });
            await newUser.save();
            return res.status(201).json({
                message: "User created successfully.!",
            });
        }else{
            return res.status(422).json({
                message: "User already exists.!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Ooops!, Internal server error",
            error: error
        });
    }
};

exports.getUsers = async (req, res) => {
    try{
        const users = await UserModel.find({},{password:0, __v:0, lastLogin:0, createdAt:0, updatedAt:0});
        if(users.length){
            return res.status(200).json({
                message: "success",
                data: users
            });
        }else{
            return res.status(200).json({
                message: "No data available.!",
                data: []
            });
        }
    }catch(error){
        return res.status(500).json({
            message: "Ooops!, Internal server error",
            error: error
        });
    }
};
