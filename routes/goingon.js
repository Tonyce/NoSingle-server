
"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
//[100, 99,..50], [50, 49,..1]
router.get('/', function(req, res, next) {
	console.log("/*****************************/")
	console.log(req.hostname, req.originalUrl, req.path, req.params, req.query)
	// localhost /goingon?indexId=3&isRefresh=1&lastId=0 /goingon {} { indexId: '3', isRefresh: '1', lastId: '0' }
	// { indexId: '3', isRefresh: '1', lastId: '0' } isRefresh 1: true, 0: false
	let query = req.query
	let indexId = query.indexId;
	let lastId = query.lastId;
	let isRefresh = query.isRefresh;
	if (isRefresh === '1') { //刷新操作
		//select from _id > indexid
	}

	if (isRefresh === '0') {	 //加载更多
		//select from _id < lastId 
	}

	if (!isRefresh && !indexId && !lastId) { // first in

	}
	let data = {
		"list": [
			{
				"infoTitle": "haosou",
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
	let errHapped = {
		errMsg: "客户端出了点bug", 
		info: `requset with: ${req.originalUrl} , ${JSON.stringify(query)}`
	}
	req.status(400).send(errHapped)
	
});

module.exports = router;