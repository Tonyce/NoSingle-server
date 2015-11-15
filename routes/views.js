
"use strict"

var express = require('express');
var router = express.Router();
var Article = require('../model/article');
/* GET home page. */

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

router.get('/article/:id', function(req, res, next) {
	let id = req.params.id
	let mongoId = new _ObjectID(id);
	let article = new Article(mongoId, "article");
	// console.log(`articleId: ${article.id}`)
	article.find(function () {
		// console.log(article)
		res.render('article/index', article);	
		// console.log(this.content);		
	})
});
router.get('/user/:id', function(req, res, next) {
	// console.log(req.params.id)
  	res.render('user/index', { title: 'Express' });
});
module.exports = router;
