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

// [START listbehavior]
function listbehavior (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `behavior` LIMIT ? OFFSET ?', [limit, token],
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


<<<<<<< HEAD
// [START list]
function listclass (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `class` LIMIT ? OFFSET ?', [limit, token],
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

// [START list_staff]
function listdescription (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `description` LIMIT ? OFFSET ?', [limit, token],
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

// [START list_staff]
function liststaff (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `staff` LIMIT ? OFFSET ?', [limit, token],
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

// [START list]
=======
// [START list]
function listclass (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `class` LIMIT ? OFFSET ?', [limit, token],
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

// [START list_staff]
function listdescription (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `description` LIMIT ? OFFSET ?', [limit, token],
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

// [START list_staff]
function liststaff (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `staff` LIMIT ? OFFSET ?', [limit, token],
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

// [START list]
>>>>>>> erik_branch
function liststudents (limit, token, cb) {
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
<<<<<<< HEAD
=======

function listtakes (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `takes` LIMIT ? OFFSET ?', [limit, token],
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

function listteaches (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `teaches` LIMIT ? OFFSET ?', [limit, token],
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

function listtest (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `test` LIMIT ? OFFSET ?', [limit, token],
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

function listtook (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `took` LIMIT ? OFFSET ?', [limit, token],
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

>>>>>>> erik_branch

function listtakes (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `takes` LIMIT ? OFFSET ?', [limit, token],
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

function listteaches (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `teaches` LIMIT ? OFFSET ?', [limit, token],
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

function listtest (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `test` LIMIT ? OFFSET ?', [limit, token],
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

function listtook (limit, token, cb) {
  token = token ? parseInt(token, 10) : 0;
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `took` LIMIT ? OFFSET ?', [limit, token],
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

<<<<<<< HEAD
<<<<<<< HEAD
module.exports = {
  list: list,
=======
=======
>>>>>>> erik_branch
function readstaff (id, cb) {
  var connection = getConnection();
  connection.query(
    'SELECT * FROM `staff` WHERE `id` = ?', id, function (err, results) {
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

// [START update]
function update (id, data, cb) {
  var connection = getConnection();
  connection.query(
    'UPDATE `books` SET ? WHERE `id` = ?', [data, id], function (err) {
      if (err) {
        return cb(err);
      }
      read(id, cb);
    });
  connection.end();
}
// [END update]

function _delete (id, cb) {
  var connection = getConnection();
  connection.query('DELETE FROM `books` WHERE `id` = ?', id, cb);
  connection.end();
}

module.exports = {
  createSchema: createSchema,
  listbehavior: listbehavior,
  listclass: listclass,
  listdescription: listdescription,
  liststaff: liststaff,
  liststudents: liststudents,
  listtakes: listtakes,
  listteaches: listteaches,
  listtest: listtest,
  listtook: listtook,
  
  create: create,
>>>>>>> erik_branch
  read: read,
};
