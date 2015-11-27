
"use strict";

var express = require('express');
var router = express.Router();
var Goingon = require('../model/goingon');

router.get('/', function(req, res, next) {
	let query = req.query
	// console.log(query)
	let indexId = query.indexId;
	let lastId = query.lastId;
	let isRefresh = query.isRefresh;
	let mongoId = "";
	let isGreat = "";
	if (isRefresh === '1') { //刷新操作 //select from _id > indexid
		mongoId = new _ObjectID(indexId);
		isGreat = true;
	}
	if (isRefresh === '0') {	 //加载更多 //select from _id < lastId 
		mongoId = new _ObjectID(lastId );
		isGreat = false;
	}
	// first in
	// let goingon = new Goingon(mongoId, "");
	Goingon.find(isGreat, mongoId, function (docs) {
		let data = {};
		data.list = docs;
		// console.log(`content:  ${content}`)
		data.images = [
			"http://static.iweekapi.com/uploads/2015/09/east-ep-a31-2450351.jpg",
			"http://static.iweekapi.com/uploads/2015/08/640x250.jpg",
			"http://static.iweekapi.com/uploads/2015/08/east-ep-a81-4325116.jpg"
		]
		res.send(data);
		return;
	})
});

router.get('/category', function (req, res, next) {

	Goingon.getCategory( function (err, doc) {
		// console.log("doc:", doc);
		let data = {
			"category" : [ 
		        "诗文", 
		        "诗歌", 
		        "code"
		    ]
		}
		res.send(data);
	});
})

router.get('/:category', function(req, res, next) {
	let category = req.params.category;
	Goingon.findWithCategory(category, function (err, docs) {
		res.send({list:docs})
	})
	
});



module.exports = router;
