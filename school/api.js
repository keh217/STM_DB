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

function getModel () {
  return require('./model-' + config.get('DATA_BACKEND'));
}

var router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

router.get('/', function hello (req, res, next) {
  res.send("Welcome to our API");
});

router.get('/kidsAndTeachers', function kidsAndTeachers (req, res, next) {
        console.log("in kidsAndTeachers");
        //get the right grade                                                                                   
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
                getModel().getStudents(req, grade, function (err, entities) {
                        if (err) {
                            return next(err);
                        }
                        res.write(JSON.stringify({students: entities}));
                        res.end(']');
                    });
            });
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
  getModel().liststaff(10, req.query.pageToken, function (err, entities, cursor) {
    if (err) {
        return next(err);
    }
    res.json({
      staff: entities,
          nextPageToken: cursor
          });
      });
    });


router.get('/students', function list (req, res, next) {
  getModel().liststudents(function (err, entities) {
    if (err) {
      return next(err);
    }
    res.json(entities);
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

/**
 * POST students:student. get specific student
 */
router.get('/students/:student', function get (req, res, next) {
  getModel().readstaff(req.params.student, function (err, entity) {
    if (err) {
      return next(err);
    }
    res.json(entity);
  });
});

router.get('/:book', function get (req, res, next) {
  getModel().read(req.params.book, function (err, entity) {
    if (err) {
      return next(err);
    }
    res.json(entity);
  });
});

router.put('/:book', function update (req, res, next) {
  getModel().update(req.params.book, req.body, function (err, entity) {
    if (err) {
      return next(err);
    }
    res.json(entity);
  });
});

router.delete('/:book', function _delete (req, res, next) {
  getModel().delete(req.params.book, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send('OK');
  });
});

router.use(function handleRpcError (err, req, res, next) {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = {
    message: err.message,
    internalCode: err.code
  };
  next(err);
});

module.exports = router;
