'use strict';

var extend = require('lodash').assign;
var mysql = require('mysql');
var config = require('../config');

function getConnection () {
  return mysql.createConnection(extend({
    database: 'STM_DB'
  }, {
    host: config.get('MYSQL_HOST'),
    user: config.get('MYSQL_USER'),
    password: config.get('MYSQL_PASSWORD')
  }));
}

function insert (data, cb) {
    var connection = getConnection();
    connection.query(
        'INSERT INTO `student` VALUES (?, ?, ?, ?, ?)',
        data,
        function (err, res) {
            if (err) {
                return cb(err);
            }
            cb(null, res);
        }
    );

    connection.query(
        'INSERT INTO `staff` (`emailID`, `name`, `access_level`) VALUES (?, ?, ?)',
        data,
        function (err, res) {
            if (err) {
                return cb(err);
            }
            cb(null, res);
        }
    );

    connection.end();
}

if (module == require.main) {
    // call the data
    var data = ;

    // run the insert
    for (var i : data){
        insert(data[i], function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
        });
    }
}
