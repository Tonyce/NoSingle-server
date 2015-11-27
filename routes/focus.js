
"use strict"

var express = require('express');
var router = express.Router();
var Focus = require('../model/focus');

// 
router.use(function (req, res, next) {
	let headers = req.headers;
    if (req._authorizationTokenInfo) {
    	next();	
    }else {
    	req.render('error')
    }
});

router.get('/', function(req, res, next) {
	let userId = req._authorizationTokenInfo.userId
	let mongoId = new _ObjectID(userId);
	let focus = new Focus(mongoId);
	focus.find((err, result) => {
		let sendData = result && result.focus || [];
		res.send(sendData);
	});
});

router.delete('/:id', function (req, res, next) {

	let userId = req._authorizationTokenInfo.userId
	let mongoId = new _ObjectID(userId);

	let removeId = req.params.id;
	let removeMongoId = new _ObjectID(removeId);
	console.log(userId, removeId)

	let focus = new Focus(mongoId);
	focus.delete(removeMongoId, (err, result) => {
		// console.log(result)
		// result: { ok: 1, nModified: 1, n: 1 }
		res.send({"ok":"ok"})
	});
})
router.put('/:id', function (req, res, next) {

	let userId = req._authorizationTokenInfo.userId
	let mongoId = new _ObjectID(userId);

	let insertId = req.params.id;
	let insertMongoId = new _ObjectID(insertId);

	let focus = new Focus(mongoId);
	focus.insert(insertMongoId, (err, result) => {
		// console.log(result)
		res.send({"ok":"ok"})
	});
})
module.exports = router;