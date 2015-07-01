var express = require('express');
var router = express.Router();
var admin = require('../controller/admin.js');

/* GET users listing. */

// router.get('/',admin.userRequired);

router.get('/', admin.index);

router.post('/delete/:id', admin.delete);

router.get('/edit/:id', admin.detail);


router.post('/edit/:id', admin.edit);

router.get('/new', admin.detail);

router.post('/new', admin.edit);

module.exports = router;
