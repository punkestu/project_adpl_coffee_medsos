const express = require('express');
const userController = require("../controller/user");
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userController.register);

module.exports = router;
