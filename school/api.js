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

var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config');
var url = require('url');


function getModel () {
    return require('./model-' + config.get('DATA_BACKEND'));
}

var router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

router.get

router.get('/', function hello (req, res, next) {
	res.send("Welcome to our API");
    });

router.get('/prevkidsAndTeachers', function kidsAndTeachers (req, res, next) {
        console.log("in kidsAndTeachers");
        var grade = req.query['grade'];
        console.log(grade);
        res.writeHead(200, {'Content-Type': 'application/json'});
        getModel().getTeachers(grade, function (err, entities) {
                if (err) {
                    return next(err);
                }
                res.write('[');
                res.write(JSON.stringify({staff: entities}));
		var prev = 1;
                getModel().getStudents(req, grade, prev, function (err, entities) {
                        if (err) {
                            return next(err);
                        }
                        res.write(JSON.stringify({students: entities}));
                        res.end(']');
                    });
            });
    });

router.get('/curkidsAndTeachers', function kidsAndTeachers (req, res, next) {
        console.log("in kidsAndTeachers");
        var grade = req.query['grade'];
        console.log(req.query);
        var ret,ret2;
        res.writeHead(200, {'Content-Type': 'application/json'});
        getModel().getTeachers(grade, function (err, entities) {
                if (err) {
                    return next(err);
                }
                res.write('[');
                res.write(JSON.stringify({staff: entities}));
		var prev = 0;
                getModel().getStudents(req, grade,prev, function (err, entities) {
                        if (err) {
                            return next(err);
                        }
                        res.write(JSON.stringify({students: entities}));
                        res.end(']');
                    });
            });
    });

router.get('/grade', function grade (req,res,next){
	var grade = req.query['grade'];
	var prev = 0;
	getModel().getStudents(req,grade,prev, function(err, entities) {
		if(err) {
		    return next(err);
		}
		res.json({students: entities});
	    });
    });

router.get('/person', function person (req,res,next){
	var id = req.query['id'];
	var student = req.query['student'];
	if(student == 1){
	    //get student
	    getModel().selectStudent(id, function(err, result){
		    if(err){
			return next(err);
		    }
		    res.json({student: result});
		});
	}else{
	    //get staff
	    getModel().selectStaff(id, function(err, result){
                    if(err){
			return next(err);
                    }
                    res.json({staff: result});
                });
	}
    });

router.get('/class', function list (req, res, next) {
	getModel().listclass(10, req.query.pageToken, function (err, entities, cursor) {
		if (err) {
		    return next(err);
		}
		res.json({
			students: entities,
			    nextPageToken: cursor
			    });
	    });
    });

router.get('/staff', function list (req, res, next) {
	var url_parts = url.parse(req.url);
	console.log(url_parts);
	console.log(url_parts.pathname);	
  getModel().liststaff(10, req.query.pageToken, function (err, entities, cursor) {
    if (err) {
        return next(err);
    }
    res.json({
      staff: entities,
          nextPageToken: cursor
          });
      });

/**********************************************************************/
router.get('/name', function list(req,res,next){
  getModel().selectStudent(req.query.id, function(err,entity){
  if (err) {
      return next(err);
    }
    res.json(entity);
  });
});

router.get('/grade', function list(req,res,next){
  getModel().selectGrade(req.query.grade, function(err,entity){
  if (err) {
      return next(err);
    }
    res.json(entity);
  });
});
/**********************************************************************/
router.get('/takes', function list (req, res, next) {
	getModel().listtakes(10, req.query.pageToken, function (err, entities, cursor) {
		if (err) {
		    return next(err);
		}
		res.json({
			students: entities,
			    nextPageToken: cursor
			    });
	    });
    });

router.get('/teaches', function list (req, res, next) {
	getModel().listteaches(10, req.query.pageToken, function (err, entities, cursor) {
		if (err) {
		    return next(err);
		}
		res.json({
			students: entities,
			    nextPageToken: cursor
			    });
	    });
    });
/**
 * POST /api/books
 *
 * Create a new book.
 */
router.get('/students/:student', function get (req, res, next) {
	getModel().read(req.params.student, function (err, entity) {
		if (err) {
		    return next(err);
		}
		res.json(entity);
	    });
    });


router.use(function handleRpcError (err, req, res, next) {
	console.log("in handleRpcError");
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code
  };
  next(err);
});

module.exports = router;
