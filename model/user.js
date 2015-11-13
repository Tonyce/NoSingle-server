
"use strict";

class User {

	constructor(id, userInfo) {
		this.id = id;
		this.userInfo = userInfo;
		this.collection = "users"
	}
	// Find some documents
	find: (callback) => {
		var collection = _db.collection(this.collection);	
		collection.find({"_id": this.id}).toArray(function(err, docs) {
			// assert.equal(err, null);
			// assert.equal(2, docs.length);
			// console.log("Found the following records");
			// console.dir(docs);
			this.userInfo = docs[0];
			callback();
		});
	}
}

module.exports = User;