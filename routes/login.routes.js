const router = require('express').Router();
const cntrl  = require('../controller');


router.post('/', cntrl.login.loginAction);

module.exports = router;
