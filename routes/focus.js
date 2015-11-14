
"use strict"

var express = require('express');
var router = express.Router();
// var Article = require('../model/article');
// /* GET home page. */
router.get('/', function(req, res, next) {
	var userBaseInfos = [
		{
			"_id":"fdsdf",
			"name":"tt",
			"imageUrl":""
		},
		{
			"_id":"fdsdf",
			"name":"tonyce",
			"imageUrl":""
		},
		{
			"_id":"fdsdf",
			"name":"jjing",
			"imageUrl":""
		}
	]
  	res.send(userBaseInfos);
});
// router.get('/article/:id', function(req, res, next) {
// 	let id = req.params.id
// 	let mongoId = new _ObjectID(id);
// 	let article = new Article(mongoId, "article");
// 	console.log(`articleId: ${article.id}`)
// 	article.find(function () {
// 		console.log(article)
// 		res.render('article/index', article);	
// 		// console.log(this.content);		
// 	})
// });
// router.get('/user/:id', function(req, res, next) {
// 	// console.log(req.params.id)
//   	res.render('user/index', { title: 'Express' });
// });
module.exports = router;