'use strict';

var express = require('express');
var config = require('../config');

var router = express.Router();

router.use(function (req, res, next) {
    res.set('Content-Type', 'text/html');
    next();
});

router.get('/', function (req, res, next) {
    res.render('upload.jade');
});

module.exports = router;
