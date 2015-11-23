
"use strict"

var express = require('express');
var router = express.Router();
var Article = require('../model/article');
var User = require('../model/user');
var Goingon = require('../model/goingon');
var assert = require('assert');

// 
router.use(function (req, res, next) {
	// let headers = req.headers;
    // console.log('headers:', headers);
    // if (req._authorizationToken) {
    	next();	
    // }else {
    // 	req.render('error')
    // }
})

router.get('/', function(req, res, next) {
  	res.render('index', { title: 'NoSingle' });
});

// articel
router.get('/article/:id', function(req, res, next) {
	let id = req.params.id
	let articelId = new _ObjectID(id);
	let article = new Article(articelId);
	article.find(function () {
		// console.log(article)
		res.render('article/index', article);	
	});
});

router.post('/article', function (req, res, next) {
	let body = req.body;
	// console.log(body);
	let userId = req._authorizationTokenInfo.userId;
	let accountName = req._authorizationTokenInfo.accountName;
	let userName = req._authorizationTokenInfo.userName;
	let userImage = req._authorizationTokenInfo.userImage;
	let authorId = new _ObjectID(userId);

	let type	 = "article";
	let time	 = new Date();
	let isWebCell = body.isWebCell || false;
	let title 	 = body.title;
	let content  = body.content;
	let htmlStr  = body.isWebCell ? body.htmlStr : null;
	let category = body.category;

	let article = new Article(null, title, content, category, authorId);
	article.save(function (err) {
		assert.equal(err, null);
		let articleId = article._id;//存goingon
		let goingo = new Goingon(null, "article", articleId, 
								authorId, userName, userImage,
								content, isWebCell, htmlStr);
		goingo.category = category || "文章";
	 	goingo.upsert(function (err) {
	 		assert.equal(err, null);
			res.send({"ok":"ok"})	
		})
	})
})




router.get('/user/:id', function(req, res, next) {
	// console.log(req.params.id)
	let id = req.params.id;
	let userId = "";
	try {
		userId = new _ObjectID(id);
	}catch (err) {
		assert.equal(err, null);
	}
	let user = new User(userId);
	user.find(function (err) {
		assert.equal(err, null);
		res.render('user/index', user);	
	})
});

router.post('/user', function(req, res, next) {
	let body = req.body;
	console.log(body);
	let uId = req._authorizationTokenInfo.userId;
	let userId = "";
	try {
		userId = new _ObjectID(uId);
	}catch (err) {
		assert.equal(err, null);
	}
	let user = new User(userId);
	user.update(body, function (err) {
		assert.equal(err, null);
		res.send({"ok": "ok"});	
	})

	let goingo = new Goingon(null, "user", userId);
	if (body.userName) {
		goingo.userName = body.userName;
	}
	if (body.believeWord) {
		goingo.content = body.believeWord;
	}
 	goingo.upsert(function (err) {
 		assert.equal(err, null);
	})
});

module.exports = router;
