const express = require('express');
const UserController = require('../controllers/user.controller');
const authVerifier = require('../helpers/auth-verifier');

module.exports = (function () {
  const router = express.Router();

  router.post('/', UserController.createUser);
  router.get('/', authVerifier, UserController.getUsers);

  return router;

})();










