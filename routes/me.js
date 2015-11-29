

"use strict"

var express = require('express');
var router = express.Router();
var Article = require('../model/article');

router.use(function (req, res, next) {
	let headers = req.headers;
    if (req._authorizationTokenInfo) {
    	next();	
    }else {
    	res.status(401).render('selfErr', { message: '您还未被授权'})
    }
})
// page
router.get('/teams/:id', function(req, res, next) {
	var id = req.params.id;
  	res.render('me/teams');
});
router.get('/achievement', function(req, res, next) {
	let authorizationTokenInfo = req._authorizationTokenInfo;
	let userId = authorizationTokenInfo.userId
	let userMongoId = new _ObjectID(userId);
	Article.findWithAuthorId(userMongoId, function (err, docs) {
		// console.log(docs)
		let achievements = docs || [];	
		res.render('me/achievement', {achievements: achievements})
	});
});
router.get('/achievement/:id', function(req, res, next) {
	let id = req.params.id
	let articelId = new _ObjectID(id);
	let article = new Article(articelId);
	article.find(function () {

		console.log(article)
		article.author = undefined;
		// let time = new Date(article.time);
		// article.time = dateFormat(time, "yyyy-MM-dd hh:mm:ss");
		// article.content = marked(article.content);
		// article.marked = marked;
		res.send(article);	
	});
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