
'use strict';

var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var csv_parser = require('./csvParser');

var router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

router.post('/upload', function(req, res) {
    var form = new formidable.IncomingForm();

    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/uploads');

    pass_csv(form, csv_parser(path));

    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function() {
        res.end('success');
    });
    form.parse(req);
});

function pass_csv(form, cb) {
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        var data = cb('./uploads/'+file.name);
        //var csv_parser = require('./csvParser');
        //var data = csv_parser('./uploads/'+file.name);
        console.log(data);
    });
}


module.exports = router;
