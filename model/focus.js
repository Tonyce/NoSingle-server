
"use strict";

var assert = require('assert');
const focusCollection = "focus";

class Focus {
	constructor(_id) {
		this._id = _id
	}

	find (callback) {
		if ((this._id instanceof _ObjectID) == false){
            callback({err: "this._id is not _ObjectID"})
            return;
        }
		let collection = _db.collection(focusCollection);
		collection.findOne({"_id": this._id}, (err, doc) => {
                assert.equal(err, null);
                // console.log("Found the following records");
    			callback(null, doc);
		});
	}

	insert(focusId, callback) {
		if ((this._id instanceof _ObjectID) == false){
            callback({err: "this._id is not _ObjectID"})
            return;
        }
        if ((focusId instanceof _ObjectID) == false){
            callback({err: "focusId is not _ObjectID"})
            return;
        }
		let collection = _db.collection(focusCollection);
		collection.updateOne({"_id":this._id}, {$addToSet:{focus:focusId}}, {upsert: true, w: 1}, (err, result) => {
			assert.equal(err, null);
			callback(null, result)
		});
	}

	delete (focusId, callback) {
		if ((this._id instanceof _ObjectID) == false){
            callback({err: "this._id is not _ObjectID"})
            return;
        }
        if ((focusId instanceof _ObjectID) == false){
            callback({err: "focusId is not _ObjectID"})
            return;
        }
		let collection = _db.collection(focusCollection);
		collection.updateOne({"_id":this._id}, {$pull:{focus:focusId}}, (err, result) => {
			assert.equal(err, null);
			callback(null, result)
		});
	}
}

module.exports = Focus;