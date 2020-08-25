const bcrypt = require('bcrypt');
const saltRounds = 8;

exports.hashPassword = (password) => {
    const hashed = bcrypt.hashSync(password, saltRounds);
    return hashed;
};

exports.verifyPassword = (passwordGiven, passwordInDB) => {
    const isPasswordMatch = bcrypt.compareSync(passwordGiven, passwordInDB);
    return isPasswordMatch;
};
