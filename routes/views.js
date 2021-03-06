
"use strict"

var express = require('express');
var router = express.Router();
var assert = require('assert');
var marked = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});
var Article = require('../model/article');
var User = require('../model/user');
var Goingon = require('../model/goingon');
var tokenHandler = require('../tokenHandler');
var ossHelper = require('../helper/aliOss.js')
var dateFormat = require('../helper/dateExtension').format

// 
router.use(function (req, res, next) {
	let headers = req.headers;
    if (req._authorizationTokenInfo) {
    	next();	
    }else {
    	res.status(403).send()
    }
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
		let time = new Date(article.time);
		article.time = dateFormat(time, "yyyy-MM-dd hh:mm:ss");
		// article.content = marked(article.content);
		article.marked = marked;
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
	});

	Goingon.insertCategory(category, function (err, result) {
		if (!result) {
			console.error("insertCategory:", result);
		}
	});
})


router.get('/users', function (req, res, next) {
	User.findAll(function (err, userIds) {
		res.send(userIds);
	})
});

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
		if (user.aboutDream) {
			user.aboutDream = user.aboutDream.replace(/\n/g, "<br>")
		}
		// console.log(user)
		res.render('user/index', user);	
	})
});

router.get('/user/info/:id', function(req, res, next) {
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
		if (user.aboutDream) {
			user.aboutDream = user.aboutDream.replace(/\n/g, "<br>")
		}
		// console.log(user)
		res.send(user);	
	})
});

router.post('/user', function(req, res, next) {
	let body = req.body;
	// console.log(body);
	let authorizationTokenInfo = req._authorizationTokenInfo;
	// console.log(authorizationTokenInfo);
	let uId = authorizationTokenInfo.userId;
	let userId = "";
	try {
		userId = new _ObjectID(uId);
	}catch (err) {
		assert.equal(err, null);
	}
	let goingo = new Goingon(null, "user", userId, userId);
	if (body.userName) {
		authorizationTokenInfo.userName = body.userName;
		goingo.userName = body.userName;
	}
	if (body.userImage) {
		authorizationTokenInfo.userImage = body.userImage;
	}

	if (body.believeWord) {
		goingo.content = body.believeWord;
	}

	let authToken = tokenHandler.signServerToken(authorizationTokenInfo)

	let user = new User(userId);
	user.update(body, function (err) {
		assert.equal(err, null);
		res.send({"ok": "ok", "token": authToken});	
	})
 	goingo.upsert(function (err) {
 		assert.equal(err, null);
	})
});

router.post('/user/images', function (req, res, next) {
	let authorizationTokenInfo = req._authorizationTokenInfo;
	let userId = authorizationTokenInfo.userId
	let imageName = `${userId}.png`
	let bufs = [];
	let size = 0;

	req.on('data', function (chunk) {
		// bufs[bufs.length] = chunk;
		bufs.push(chunk)
		size += chunk.length;
	});
	req.on('end', function() {
		let data = Buffer.concat(bufs, size);
		ossHelper.putObject(imageName, data, function (err) {
			assert.equal(err, null);
			updateUser(userId);
		})
	});

	function updateUser (userId) {
		let userImagePath = `http://no-single.oss-cn-beijing.aliyuncs.com/${userId}.png`
		let userMongoId = "";
		try {
			userMongoId = new _ObjectID(userId);
		}catch (err) {
			assert.equal(err, null);
		}
		let user = new User(userMongoId);
		let updateInfo = {
			userImage: userImagePath
		}
		authorizationTokenInfo.userImage = userImagePath;
		let authToken = tokenHandler.signServerToken(authorizationTokenInfo)
		user.update(updateInfo, function (err) {
			assert.equal(err, null);
			res.send({"ok": "ok", "token": authToken});	
		})
		let goingo = new Goingon(null, null, null, userMongoId);
		goingo.update({userImage: userImagePath})
	}
})

module.exports = router;
