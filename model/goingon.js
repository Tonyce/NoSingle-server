

"use strict";

class Goingon { //goingon  只保存快照

	constructor(id, content) {
		this.id = id;
		this.content = content;
		this.collection = "goingon"
	}
	// Find some documents
	find (isGreat, callback) {
		let collection = _db.collection(this.collection);
		let queryCondition = {}
		if (isGreat) {
			queryCondition = {
				"_id": {
					"$gt": this.id
				}
			}
		}else if (this.id) {
			queryCondition = {
				"_id": {
					"$lt": this.id
				}
			}
		}
		collection.find(queryCondition).sort({"_id": -1}).limit(20).toArray((err, docs) => {
			// assert.equal(err, null);
			// assert.equal(2, docs.length);
			// console.log("Found the following records");
			// console.dir(docs);
			this.content = docs;
			callback();
		});
	}
}

module.exports = Goingon;