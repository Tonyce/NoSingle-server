
"use strict";

var assert = require('assert');
const userCollection = "user";

class User {

	constructor(_id, tempId, accountName, password, userName, userImage, believeWord) {
		this._id = _id;
		this.tempId = tempId;
		this.accountName = accountName;
		this.password = password;
		this.userName = userName;
		this.userImage = userImage;
		this.believeWord = believeWord;
	}


	static findAll (callback) {
		let collection = _db.collection(userCollection);
		collection.find({}, {"_id": 1}).toArray( (err, docs) => {
			assert.equal(err, null);
			// 随机
            callback(null, docs)
        })
	}

	find (callback) {
		if (this._id instanceof _ObjectID) {
			let collection = _db.collection(userCollection);
			collection.findOne({_id: this._id}, (err, doc) => {
				assert.equal(err, null);
				assert.notEqual(null, doc);
				// console.log("doc",doc)
				this.accountName = doc.accountName;
				this.userName = doc.userName;
				this.userImage = doc.userImage;
				this.believeWord = doc.believeWord;
				this.aboutDream = doc.aboutDream;
				this.experience = doc.experience;
	            callback()
	        })
		}else {
			callback({err: "id isnot instanceof ObjectID"})
		}
	}

	findWithAccountName (callback) {
		let collection = _db.collection(userCollection);
		if (!this.tempId) {
			console.error("findWithAccountName without tempId")
			collection.findOne({accountName: this.accountName}, (err, doc) => {
				assert.equal(err, null);
				assert.notEqual(null, doc);
				this._id = doc._id;
				this.password = doc.password
				this.userName = doc.userName;
				this.userImage = doc.userImage;
				this.believeWord = doc.believeWord;
				this.aboutDream = doc.aboutDream;
				this.experience = doc.experience;
				// console.log(doc)
				this.friendAddNeedCheck = doc.friendAddNeedCheck;
    			this.allowSystemNotify = doc.allowSystemNotify;
    			this.showLocation = doc.showLocation;
	            callback()
	        })
		}else {
	        collection.findOneAndUpdate({accountName: this.accountName}, {$set: {tempId: this.tempId}}, 
								        // {
								        //     projection: {b:1, d:1}, 
								        //     sort: {a:1}, 
								        //     returnOriginal: false, 
								        //     upsert: true
								        // }, 
				(err, result) => {
			        assert.equal(null, err);
			        assert.equal(1, result.lastErrorObject.n);
			        let doc = result.value;
			        this._id = doc._id;
					this.password = doc.password
					this.userName = doc.userName;
					this.userImage = doc.userImage;
					this.believeWord = doc.believeWord;
					this.aboutDream = doc.aboutDream;
					this.experience = doc.experience;

					this.friendAddNeedCheck = doc.friendAddNeedCheck;
    				this.allowSystemNotify = doc.allowSystemNotify;
    				this.showLocation = doc.showLocation;
					// console.log(doc)
			        callback()
		    });
	    }
	}

	save (callback) {
		if (this._id !== null) {
			callback({err: "this._id !== null"})
			return;
		}
		let collection = _db.collection(userCollection);
		console.log(this)
		collection.insertOne(this, (err, result) => {
			assert.equal(err, null);
			assert.equal(1, result.insertedCount);
			this._id = result.insertedId;
	        callback()
	    });
	}

	/*
		info: {key: value}
	 */
	update (info, callback)  {
		let collection = _db.collection(userCollection);
		collection.update({_id: this._id}, {$set: info}, (err, result) => {
			assert.equal(err, null);
	        callback()
	    });
	}
}

module.exports = User;

// collection.find({"_id": this._id}).toArray((err, docs) => {
// 	assert.equal(err, null);
// 	this.userInfo = docs[0];
// 	callback();
// });
// 
	// static findWithRef (ref, callback) {
	// 	let collection = _db.collection(ref.namespace);	
	// 	collection.findOne({_id: ref.oid},  (err, doc) => {
 //            assert.equal(null, err);
 //            callback(doc)
 //        })
	// }