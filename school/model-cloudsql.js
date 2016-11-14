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

function getStudents (req,grade,prev, cb) {
    console.log("in getStudents");
    var connection = getConnection();
    if(parseInt(prev) == 1){
	if(grade == '1'){
	    grade = 'K';
	}else{
	    try{
		grade = parseInt(grade) -1;
	    }
	    catch(err){
		console.log(err.message);
	    }
	}
    }
    var year = req.app.get('year'); 
    //console.log("year is: " + year);
    //console.log("grade is: " + grade);
    connection.query(
		     'select SEX, firstName, lastName, dial4, ydsd.classroomBehavior as behaviorObservation from student natural join ydsd where ydsd.grade = '+grade+' and year = '+year+'; ',
		     function (err, results) {
			 console.log('results: ' + results);
			 if (err) {
			     return cb(err);
			 }
			 cb(null, results);
		     }
		     );
    connection.end();
}

function getTeachers (grade, cb) {
    var connection = getConnection();
    connection.query(
		     'SELECT * FROM `staff` where grade = '+grade+'',
		     function (err, results) {
			 if (err) {
			     return cb(err);
			 }
			 cb(null, results);
		     }
		     );
    connection.end();
}

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

function liststudents (cb) {
  var connection = getConnection();
  connection.query(
    'SELECT `id`, `lastName`, `firstName`, `DOB` FROM `student`',
    function (err, results) {
      if (err) {
        return cb(err);
      }
      cb(null, results);
    }
  );
  connection.end();
}

/**************************/
function selectStudent (id,cb){
  var connection = getConnection();
  connection.query('SELECT * FROM `student`,`ydsd` WHERE `student`.`id` = ?', id, function(err,results){
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

function selectStaff (id,cb){
    var connection = getConnection();
    connection.query('SELECT * FROM `staff` WHERE `staff`.`emailID` = ?', id, function(err,results){
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

function selectGrade(grade,cb){
  var connection = getConnection();
  connection.query('SELECT * FROM student natural join ydsd  WHERE ydsd.grade = ?',grade,function(err,results){
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

/*************************/
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
    getStudents: getStudents,
    getTeachers: getTeachers,
    listclass: listclass,
    liststaff: liststaff,
    liststudents: liststudents,
    selectStudent: selectStudent,
    selectStaff: selectStaff,
    selectGrade: selectGrade,
    read: read,
};
