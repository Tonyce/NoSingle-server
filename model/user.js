
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

	// Find some documents
	find (callback) {
		if (this._id instanceof _ObjectID) {
			let collection = _db.collection(userCollection);
			collection.findOne({_id: this._id}, (err, doc) => {
				assert.equal(err, null);
				assert.notEqual(null, doc);
				this.accountName = doc.accountName;
				this.userName = doc.userName;
				this.userImage = doc.userImage;
				this.believeWord = doc.believeWord;
	            callback()
	        })
		}else {
			callback({err: "id isnot instanceof ObjectID"})
		}
	}

	findWithAccountName (callback) {
		let collection = _db.collection(userCollection);
		if (!this.tempId) {
			collection.findOne({accountName: this.accountName}, (err, doc) => {
				assert.equal(err, null);
				assert.notEqual(null, doc);
				this._id = doc._id;
				this.password = doc.password
				this.userName = doc.userName;
				this.userImage = doc.userImage;
				this.believeWord = doc.believeWord;
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
		        	// console.log(result)
		     		//  { value: 
					  //  { _id: 564fef2eb326f20f21743dd8,
					  //    tempId: 564f3049261369dc1d810b0a,
					  //    accountName: 'd_ttang',
					  //    password: 'ttang',
					  //    userName: null,
					  //    userImage: null,
					  //    believeWord: null },
					  // lastErrorObject: { updatedExisting: true, n: 1 },
					  // ok: 1 }
			        assert.equal(null, err);
			        assert.equal(1, result.lastErrorObject.n);
			        let doc = result.value;
			        this._id = doc._id;
					this.password = doc.password
					this.userName = doc.userName;
					this.userImage = doc.userImage;
					this.believeWord = doc.believeWord;
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