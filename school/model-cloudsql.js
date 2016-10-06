// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

// [START list]
function list (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `student` LIMIT ? OFFSET ?', [limit, token],
    function (err, results) {
      if (err) {
        return cb(err);
      }
      var hasMore = results.length === limit ? token + results.length : false;
      cb(null, results, hasMore);
    }
  );
  connection.end();
}
// [END list]

function read (id, cb) {
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `student` WHERE `id` = ?', id, function (err, results) {
      if (err) {
        return cb(err);
      }
      if (!results.length) {
        return cb({
          code: 404,
          message: 'Not found'
        });
      }
      cb(null, results[0]);
    });
  connection.end();
}

module.exports = {
  list: list,
  read: read,
};
