var express = require('express');
const fs = require('fs');

var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  fs.writeFileSync('../server/public/' + req.query.filename, req.body.content);
});

module.exports = router;
