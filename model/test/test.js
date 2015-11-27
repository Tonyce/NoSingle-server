"use strict"

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var DBRef = require('mongodb').DBRef;
var assert = require('assert');

global._ObjectID = ObjectID;
global._DBRef = DBRef;
global._db = "";

var User = require("../user.js")
var Article = require("../article.js")
var Focus = require("../focus")
var Goingon = require("../goingon")

var mongoUrl = 'mongodb://localhost:27017/Test';
MongoClient.connect(mongoUrl, function(err, db) {
    if(err){
        console.log("mongoClient open err", err)
        return
    }
    _db = db;

    // insertNewUser() //ok
    // findUser () ok
    // findUserWithAccountName() ok
    
    // insertNewArticle() ok
    // findArticle() ok
    // 
    // insertFocus() ok
    // deleteFocus()
    // findFocus() ok
    // 
    // insertCategory() ok
    // getCategory() ok
});

function insertCategory () {
	Goingon.insertCategory("code", function (err, result) {
		console.log(result && result.result);
		_db.close()
	})
}

function getCategory () {
	Goingon.getCategory(function (err, doc) {
		console.log(doc)
		// category: [ '诗文', '诗歌', 'code' ] 
		_db.close()
	})
}

function insertNewUser () {
	let tempId = new _ObjectID("564f3049261369dc1d810b0a")
	let user = new User(null, tempId , "d_ttang", "ttang")
	user.save(function (err) {
		assert.equal(err, null);
		assert.equal(true, user._id instanceof _ObjectID);
		console.log("insertNew pass...", user)
	})
}

function findUser () {
	let id = new _ObjectID("564f3049261369dc1d810b0a")
	let user = new User(id);
	user.find(function (err) {
		assert.equal(err, null);
		console.log("findUser pass...", user)
	})
}

function findUserWithAccountName () {
	let tempId = new _ObjectID("564f3049261369dc1d810b0b")
	let user = new User(null, tempId, "d_ttang");
	user.findWithAccountName(function (err) {
		assert.equal(err, null);
		console.log("findUserWithAccountName pass...", user)
	})
}

function insertNewArticle () {
	let authorId = new _ObjectID("564f3049261369dc1d810b0a")
	let article = new Article(null, "断章", 
		"你在桥上看风景，看风景的人在你。。。", "美文", authorId)
	article.save(function (err) {
		assert.equal(err, null);
		console.log("article save pass...", article);
	})
}

function findArticle () {
	let articleId = new _ObjectID("564f3b3d65ab56f61d09b45e");
	let article = new Article(articleId)
	article.find(function (err) {
		assert.equal(null, err);
		console.log("find article pass...", article)
	})
}

function insertFocus () {
	let id = new _ObjectID("5653d25067828ab92f44ffd7")
	let focus = new Focus(id)
	let focusId = new _ObjectID("564f3049261369dc1d810b0a")
	focus.insert(focusId, (err, result) => {
		console.log(result.result)
	})
}

function deleteFocus () {
	let id = new _ObjectID("564f3049261369dc1d810b0a")
	let focus = new Focus(id)
	let focusId = new _ObjectID("565000159572b9072aea62a2")
	focus.delete(focusId, (err, result) => {
		console.log(result)
	})
}

function findFocus () {
	let id = new _ObjectID("564f3049261369dc1d810b0a")
	let focus = new Focus(id)
	focus.find((err, result) => {
		console.log(result)
	})
}


