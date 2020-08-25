const express = require('express');
const AuthController = require('../controllers/auth.controller');

module.exports = (function () {
  const router = express.Router();

  router.post('/login', AuthController.login);

  return router;

})();










