
"use strict";
var assert = require('assert');

const articleCollection = "article"

class Article {
	/*
		title... : str
		authorId: ObjectID
	 */
	constructor(_id, title, content, category, authorId) {
		this._id = _id;
		this.title = title;
		this.content = content;
		this.category = category;
		this.time = new Date();
		if (authorId instanceof _ObjectID) {
			this.author = new _DBRef("user", authorId);
		}
	}

	// Find some documents
	find (callback) {
		if ((this._id instanceof _ObjectID) === false) {
			callback({err: "this._id is illeagel"})
			return;
		}
		let collection = _db.collection(articleCollection);	
		collection.findOne({_id: this._id}, (err, doc) => {
	        assert.equal(null, err);
	        assert.notEqual(null, doc);
	        this.title = doc.title;
	        this.content = doc.content;
	        this.category = doc.category;
	        this.time = doc.time;
	        collection = _db.collection(doc.author.namespace)
	        collection.findOne({_id: doc.author.oid}, (err, doc) => {
	            assert.equal(null, err);
	            this.author = doc
	            callback()
	        });
		});
	}

	static findWithAuthorId (authorId, callback) {
		if ((authorId instanceof _ObjectID) === false) {
			callback({err: "this._id is illeagel"})
			return;
		}
		let collection = _db.collection(articleCollection);	
		collection.find({"author.$id": authorId}).toArray(function(err, docs){
	        assert.equal(null, err);
	        callback(null, docs);
		});
	}

	save (callback) {
		if (this._id !== null) {
			callback({err: "this._id !== null"})
			return;
		}
		if ((this.author instanceof _DBRef) == false) {
			callback({err: "connot connect the author"})
			return;
		}
		let collection = _db.collection(articleCollection);
		collection.insertOne(this, (err, result) => {
			assert.equal(err, null);
			assert.equal(1, result.insertedCount);
			this._id = result.insertedId;
	        callback()
	    });
	}
}


module.exports = Article;

// collection.findOne({"_id": this._id}).toArray((err, docs) => {
		// 	assert.equal(err, null);
		// 	let article = docs[0];
		// 	this.author = {
		// 		"_id": "56407713a79e506720fb859f",
		// 		"userName": "TT",
		// 		"userImage" : "https://tower.im/assets/default_avatars/winter.jpg",
		// 		"believeWord":"好好学习，天天向上"
		// 	}
		// 	// this.content = article.content;
		// 	callback();