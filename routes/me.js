

"use strict"

var express = require('express');
var router = express.Router();

// router.use(function (req, res, next) {
// 	let headers = req.headers;
//     if (req._authorizationTokenInfo) {
//     	next();	
//     }else {
//     	res.status(401).render('selfErr', { message: '您还未被授权'})
//     }
// })
// page
router.get('/teams/:id', function(req, res, next) {
	var id = req.params.id;
  	res.render('me/teams');
});
router.get('/achievement/:id', function(req, res, next) {
	var id = req.params.id;
	res.render('me/achievement')
});
router.get('/about', function(req, res, next) {
  	res.render('about');
});

router.get('/suggest/', function(req, res, next) {
	res.render('me/suggest')
});
router.post('/suggest/', function(req, res, next) {
	res.send({'ok':'ok'})
});
module.exports = router;