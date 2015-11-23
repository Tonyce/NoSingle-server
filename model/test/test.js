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
});

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

