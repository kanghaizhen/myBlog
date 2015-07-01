var express = require('express');
var router = express.Router();
var page = require('../controller/page.js');

/* GET home page. */
router.get('/', page.index);

router.get('/page/:id', page.detail);

router.get('/login', page.loginGet);

router.post('/login', page.loginPost);

router.get('/quit', page.quit);

module.exports = router;
