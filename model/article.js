
"use strict";

class Article {

	constructor(id, content) {
		this.id = id;
		this.content = content;
		this.author = {}
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
			this.author = {
				"_id": "56407713a79e506720fb859f",
				"userName": "TT",
				"userImage" : "https://tower.im/assets/default_avatars/winter.jpg",
				"believeWord":"好好学习，天天向上"
			}
			this.content = article.content;

			callback();
		});
	}
}


module.exports = Article;