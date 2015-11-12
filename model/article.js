
"use strict";

class Article {

	constructor(id, content) {
		this.id = id;
		this.content = content;
		this.collection = "articles"
	}
	// Find some documents
	find (callback) {
		// (callback) => {
		
		var collection = _db.collection(this.collection);	

		collection.find({"_id": this.id}).toArray((err, docs) => {
			// assert.equal(err, null);
			// assert.equal(2, docs.length);
			// console.log("Found the following records");
			// console.dir(docs);
			// console.log(`content : ${this.content}`)
			this.content = docs;
			callback();
		});
	}
}


module.exports = Article;