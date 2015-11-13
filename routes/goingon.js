
"use strict";

var express = require('express');
var router = express.Router();
var Goingon = require('../model/goingon');

router.get('/', function(req, res, next) {
	let query = req.query
	console.log(query)
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
	let goingon = new Goingon(mongoId, "");
	goingon.find(isGreat, function () {
		let content = goingon.content
		let data = {}
		data.list = content
		console.log(`content:  ${content}`)
		data.images = [
			"http://static.iweekapi.com/uploads/2015/09/east-ep-a31-2450351.jpg",
			"http://static.iweekapi.com/uploads/2015/08/640x250.jpg",
			"http://static.iweekapi.com/uploads/2015/08/east-ep-a81-4325116.jpg"
		]
		res.send(data);
		return;
	})
});

module.exports = router;

/*
let data = {
		"list": [
			{
				"infoTitle": "haosouhao",
				"infoUrl": "http://haosou.com",
				"isWebCell": false,
				"userImage": "https://tower.im/assets/default_avatars/winter.jpg",
				"time": "",
				"content": ""
			},
			{
				"infoTitle": "baidu",
				"infoUrl": "http://baidu.com",
				"isWebCell": false,
				"userImage": "https://tower.im/assets/default_avatars/nightfall.jpg",
				"time": "",
				"content": ""
			},
			{
				"infoTitle": "yahoo",
				"infoUrl": "http://yahoo.com",
				"isWebCell": false,
				"userImage": "https://tower.im/assets/default_avatars/cloud.jpg",
				"time": "",
				"content": ""
			},
			{
				"infoTitle": "google",
				"infoUrl": "http://google.com",
				"isWebCell": true,
				"userImage": "https://tower.im/assets/default_avatars/cloud.jpg",
				"time": "",
				"content": "",
				"htmlStr": "<html><head><title>test</title><style>* {}</style></head><body style=\"background: red;\"><div style=\"margin: 10px 10px; padding: 0 6px;\"><div style=\"font-size:10; text-align: center; width: 47px; border-radius: 10px; border: solid 1px #278eff; color: #278eff; padding-top: 1px; margin-bottom: 6px\">标签</div><div style=\"font-size: 13\">天天天向上</div><div style=\"font-size: 13\">好好学习</div></div></body></html>"
			}
			
		],
		"images": [
			"http://static.iweekapi.com/uploads/2015/09/east-ep-a31-2450351.jpg",
			"http://static.iweekapi.com/uploads/2015/08/640x250.jpg",
			"http://static.iweekapi.com/uploads/2015/08/east-ep-a81-4325116.jpg"
		]
	}
	res.send(data);
	return;
 */