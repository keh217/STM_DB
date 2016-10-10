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

<<<<<<< HEAD
<<<<<<< HEAD
router.get('/', function hello (req, res, next) {
  res.send("Welcome to our API");
});

/**
 * GET /api/students
 *
 * Retrieve a page of books (up to ten at a time).
 */
=======
=======
>>>>>>> erik_branch

router.get('/behavior', function list (req, res, next) {
  getModel().listbehavior(10, req.query.pageToken, function (err, entities, cursor) {
    if (err) {
        return next(err);
    }
    res.json({
      staff: entities,
          nextPageToken: cursor
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

router.get('/description', function list (req, res, next) {
  getModel().listdescription(10, req.query.pageToken, function (err, entities, cursor) {
    if (err) {
        return next(err);
    }
    res.json({
      staff: entities,
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


<<<<<<< HEAD
>>>>>>> erik_branch
=======
>>>>>>> erik_branch
router.get('/students', function list (req, res, next) {
  getModel().liststudents(10, req.query.pageToken, function (err, entities, cursor) {
    if (err) {
      return next(err);
    }
    res.json({
      students: entities,
      nextPageToken: cursor
    });
  });
});

router.get('/takes', function list (req, res, next) {
  getModel().listtakes(10, req.query.pageToken, function (err, entities, cursor) {
<<<<<<< HEAD
=======
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
>>>>>>> erik_branch
    if (err) {
      return next(err);
    }
    res.json({
      students: entities,
      nextPageToken: cursor
    });
  });
});

<<<<<<< HEAD
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

=======
>>>>>>> erik_branch
router.get('/test', function list (req, res, next) {
  getModel().listtest(10, req.query.pageToken, function (err, entities, cursor) {
    if (err) {
      return next(err);
    }
    res.json({
      students: entities,
      nextPageToken: cursor
    });
  });
});

router.get('/took', function list (req, res, next) {
  getModel().listtook(10, req.query.pageToken, function (err, entities, cursor) {
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

/**
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> erik_branch
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


/**
 * GET /api/books/:id
 *
 * Retrieve a book.
 */
router.get('/:book', function get (req, res, next) {
  getModel().read(req.params.book, function (err, entity) {
    if (err) {
      return next(err);
    }
    res.json(entity);
  });
});

/**
 * PUT /api/books/:id
 *
 * Update a book.
 */
router.put('/:book', function update (req, res, next) {
  getModel().update(req.params.book, req.body, function (err, entity) {
    if (err) {
      return next(err);
    }
    res.json(entity);
  });
});

/**
 * DELETE /api/books/:id
 *
 * Delete a book.
 */
router.delete('/:book', function _delete (req, res, next) {
  getModel().delete(req.params.book, function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).send('OK');
  });
});

/**
>>>>>>> erik_branch
 * Errors on "/api/books/*" routes.
 */
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