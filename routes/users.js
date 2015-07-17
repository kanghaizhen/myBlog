var express = require('express');
var router = express.Router();
var admin = require('../controller/admin.js');
var qn = require('../controller/qiniu.js');

/* GET users listing. */

// router.get('/',admin.userRequired);

router.get('/', admin.index);

router.post('/delete/:id', admin.delete);

router.get('/edit/:id', admin.detail);

router.post('/edit/:id', admin.edit);

router.get('/new', admin.detail);

router.post('/new', admin.edit);

router.get("/token",qn.token);

router.post("/url",qn.url);

module.exports = router;
