
"use strict";

class Article {

	constructor(id, content) {
		this.id = id;
		this.content = content;
		this.author = ""
		this.collection = "article"
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
			let article = docs[0];
			this.author = article.author || "56407713a79e506720fb859f"
			this.content = article.content;
			callback();
		});
	}
}


module.exports = Article;