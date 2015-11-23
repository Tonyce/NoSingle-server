

"use strict";

var assert = require('assert');

const goingonCollection = "goingon";

// _id
// label(category)
// isWebCell (Bool)
// time
// type
// typeId
// userId
// userName
// userImage
// content
// htmlStr


class Goingon { //goingon  只保存快照
	constructor(_id, type, typeId, userId, userName, userImage, content, isWebCell, htmlStr) {
		if (_id) {
            this._id = _id;    
        }
        
        this.time = new Date();
        if (type) {
            this.type = type;    
        }
        if (typeId instanceof _ObjectID) {
            this.typeRef = new _DBRef(type, typeId);
        }

        this.userId = userId;

        if (userName) {
            this.userName = userName;    
        }
        if (userImage) {
            this.userImage = userImage;
        }
        if (content) {
            this.content = content;    
        }
        this.isWebCell = isWebCell || false;
        if (isWebCell) {
            this.htmlStr = htmlStr;
        }
	}


    save (callback) {
        if (this._id !== null) {
            callback({err: "this._id !== null"})
            return;
        }
        if ((this.typeRef instanceof _DBRef) == false) {
            callback({err: "connot connect the ref"})
            return;
        }
        let collection = _db.collection(goingonCollection);
        collection.insertOne(this, (err, result) => {
            assert.equal(err, null);
            assert.equal(1, result.insertedCount);
            this._id = result.insertedId;
            callback()
        });
    }

    upsert (callback) {
        if ((this.typeRef instanceof _DBRef) == false) {
            callback({err: "connot connect the ref"})
            return;
        }
        let collection = _db.collection(goingonCollection);
        collection.update({typeRef: this.typeRef}, {$set: this}, {upsert: true},(err, result) => {
            assert.equal(err, null);
            callback()
        });
    }

    update (updateInfo, callback) {
        let collection = _db.collection(goingonCollection);
        collection.updateMany({userId: this.userId}, {$set: updateInfo}, (err, result) => {
            assert.equal(err, null);
            callback && callback()
        });   
    }

	// Find some documents
	static find (isGreat, _id, callback) {
        let result = [];
		let collection = _db.collection(goingonCollection);
		let queryCondition = {}
		if (isGreat) {
			queryCondition = {
				"_id": {
					"$gt": _id
				}
			}
		}else if (this.id) {
			queryCondition = {
				"_id": {
					"$lt": _id
				}
			}
		}
        collection.find(queryCondition).sort({"_id": -1}).limit(20).toArray(
            (err, docs) => {
                assert.equal(err, null);
                // console.log("Found the following records");
                // console.dir(docs);
    			callback(docs);
		});
	}
}

module.exports = Goingon;

//collection.find(queryCondition).sort({"_id": -1}).limit(20).toArray((err, docs) => {
            // assert.equal(err, null);
            // assert.equal(2, docs.length);
            // console.log("Found the following records");
            // console.dir(docs);
/*
    docs =  [
        {
            "_id": "56449916631c99b8f707a33c",
            "label":"诗词",
            "isWebCell": false,
            "time": "",
            "type": "article",
            "typeId": "56444350631c99b8f707a337",
            "userName": "tt",
            "userImage": "https://tower.im/assets/default_avatars/winter.jpg",
            "content": "看风景的人在看你。明月装饰了你的窗子。。。"
        },
        {
            "_id": "564498f4631c99b8f707a33b",
            "label":"用户",
            "isWebCell": true,
            "webCellHeight": 150,
            "time": "",
            "type": "user",
            "typeId": "5640e3522bde38033066758d",
            "userName": "TTang",
            "userImage": "https://tower.im/assets/default_avatars/cloud.jpg",
            "htmlStr": "<html><head><title>test</title><style>* {}</style></head><body><div style=\"margin: 10px 10px; padding: 0 6px;\"><div style=\"font-size:10; text-align: center; width: 47px; border-radius: 10px; border: solid 1px #278eff; color: #278eff; padding-top: 1px; margin-bottom: 6px\">标签</div><div style=\"font-size: 13\">天天天向上</div><div style=\"font-size: 13\">好好学习</div></div></body></html>"
        },
        {
            "_id": "564498e8631c99b8f707a33a",
            "label":"用户",
            "isWebCell": false,
            "time": "",
            "type": "user",
            "typeId": "56444350631c99b8f707a337",
            "userName": "tonyce",
            "userImage": "https://tower.im/assets/default_avatars/nightfall.jpg",
            "content": "坚持梦想，万一实现了呢。。。"
        },
        {
            "_id": "564498de631c99b8f707a339",
            "label":"科技",
            "isWebCell": false,
            "time": "",
            "type": "article",
            "typeId": "56444350631c99b8f707a337",
            "userName": "jjing",
            "userImage": "https://tower.im/assets/default_avatars/cloud.jpg",
            "content": "你站在桥上看风景，看风景的人在看你。。。"
        }
    ]
*/
