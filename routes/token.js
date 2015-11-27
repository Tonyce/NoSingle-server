
"use strict";

var assert = require('assert');
var tokenHandler = require('../tokenHandler');
var express = require('express');
var router = express.Router();

var User = require('../model/user');

var tempUserCollection = "tempUser"
var userCollection = "user"

router.get('/temp', function(req, res, next) {
	let clientTokenInfo = req._clientTokenInfo;
		clientTokenInfo.iat = new Date(clientTokenInfo.iat * 1000)
	let tempTokenInfo = req._tempTokenInfo; // { tempUserId: '56407708a79e506720fb859e', iat: 1447065352, iss: 'ttangServer' }
	let tempUserId = tempTokenInfo.tempUserId + "";  // if int new ID will pass
	let mongoId = "";
	try {
		mongoId = new _ObjectID(tempUserId);
	}catch (err) {
		console.log(`tempUserId illeagl: ${tempUserId}`)
	}
	if (!tempTokenInfo || !mongoId) {
		
		createTempToken(clientTokenInfo, 
			function generateTempToken (err, mgBackObject) {
				if (!err) {
					let tempUserId = mgBackObject.insertedIds[0]
					responseToClient(null, tempUserId);
				}else {
					responseToClient(err);
				}
			});
	}else {
		responseToClient(null, tempUserId);
		// console.log(`上次访问的时间：${tempTokenInfo.iat}`) //上次访问的时间：1447067193
		let queryCondition = {
			_id: mongoId
		}
		updateTempToken( queryCondition, clientTokenInfo, 
			function generateTempToken (err, mgBackObject) {
				if (err) {
					console.error(err);
				}
			});
	}

	function responseToClient (err, tempUserId) {
		if (!err) {
			let tempTokenInfo = {
				tempUserId: tempUserId
			}
			let tempToken = tokenHandler.signServerToken(tempTokenInfo)
			let goodSet = {
				"img": String.fromCharCode(59148),
				"word":"赞一下", 
				"href":"https://itunes.apple.com/cn/app/liu-li-xue-yuan/id978249810?mt=8",
				"colorIndex": 0
			}
			// goodSet = null
			res.send({ tempToken: tempToken, token: "", goodSet: goodSet});	
		}else {
			res.status(503).send(err)
		}
	}
});

//register
router.post('/auth/register', function (req, res) {
    // console.log("auth:", req.body)
    let clientTokenInfo = req._clientTokenInfo;
    let tempTokenInfo = req._tempTokenInfo;
    let tempUserId = tempTokenInfo.tempUserId;
    let accountName = req.body.accountName;
    let password = req.body.password;
    let user = new User(null, tempUserId, accountName, password);
    user.save(function () {
    	let tokenInfo = {
	        userId: user._id,
	        accountName: accountName,
	        userName: user.userName,
	        userImage: user.userImage,
	    }
	    let tempToken = tokenHandler.signServerToken(tempTokenInfo)
	    let authToken = tokenHandler.signServerToken(tokenInfo)
	    var result = { tempToken: tempToken, token: authToken }
	    res.send(result);
    })
});

// login
router.post('/auth', function (req, res) {
	let clientTokenInfo = req._clientTokenInfo;
    let tempTokenInfo = req._tempTokenInfo;
	let tempUserId = tempTokenInfo && tempTokenInfo.tempUserId;
    let accountName = req.body.accountName;
    let password = req.body.password;
    let type = req.body.type
    if (type === "login") {
	    let user = new User(null, tempUserId, accountName, password);
	    user.findWithAccountName(function () {
	    	if (user.password === password) {
		    	let tokenInfo = {
			        userId: user._id,
			        accountName: accountName,
			        userName: user.userName,
			        userImage: user.userImage,
			    }
			    let tempToken = tokenHandler.signServerToken(tempTokenInfo)
			    let authToken = tokenHandler.signServerToken(tokenInfo)

			    // console.log(user)
			    let userBaseInfo = {
			    	"userName": user.userName,
			    	"userImage": user.userImage,
			    	"believeWord": user.believeWord,
			    	"aboutDream": user.aboutDream,
			    	"experience": user.experience,
			    	"friendAddNeedCheck" : user.friendAddNeedCheck,
			    	"allowSystemNotify": user.allowSystemNotify,
    				"showLocation" : user.showLocation
			    }

			    var result = { tempToken: tempToken, token: authToken, userBaseInfo: userBaseInfo }
			    res.send(result);
			}else {
				res.send({"err": "password is wrong"})
			}
	    })
	    return
	}
	if (type === "register") {
		console.log(req.body)
		let user = new User(null, tempUserId, accountName, password);
	    user.save(function () {
	    	let tokenInfo = {
		        userId: user._id,
		        accountName: accountName,
		        userName: user.userName,
		        userImage: user.userImage,
		    }
		    let tempToken = tokenHandler.signServerToken(tempTokenInfo)
		    let authToken = tokenHandler.signServerToken(tokenInfo)
		    var result = { tempToken: tempToken, token: authToken }
		    res.send(result);
	    })
	    return
	}
	res.status(403).send({err: "type is null"});
})
// logout
router.get('/auth', function (req, res) {
	//let clientTokenInfo = req._clientTokenInfo;
    //let tempTokenInfo = req._tempTokenInfo;
    //let tempToken = tokenHandler.signServerToken(tempTokenInfo);
    res.send({ tempToken: "", token: "" });
});
module.exports = router;

function createTempToken (tempUserInfo, callback) {
	if(_db) {
		let collection = _db.collection(tempUserCollection);
        collection.insert(tempUserInfo, {w: 1}, function (err, mgBackObject) {
            if (err) {
                console.warn('--' + err.message);
                callback(err)
            } else {
                callback(null, mgBackObject);
            }
        });
    }else{
        callback({info: '数据库连接错误'});
    }
    // if (err && err.message.indexOf('E11000') !== -1) { //E11000 duplicate key error
    // callback('404');
}
function updateTempToken (queryCondition, tempUserInfo, callback) {
	if ( _db ) {
		let collection = _db.collection(tempUserCollection);
		collection.update(queryCondition, tempUserInfo, {upsert: true, new: true}, function (err, mgBackObject) {
            if (err) {
                console.warn(err.message);
                callback(err);
            } else {
                callback(null, mgBackObject);
            }
        });
	}else{
        callback({info: '数据库连接错误'});
    }
}
    
// console.log(mgBackObject)
// { result: { ok: 1, n: 1 },
//   ops: 
//    [ { phoneCountry: 'en-US',
//        versionBuild: 'v1.0(1)',
//        iat: 1447064007.998832,
//        iss: 'ttang',
//        appName: 'NoSingle',
//        phoneInfo: 'iPhone Simulator-iPhone OS-9.1-iPhone-iPhone)',
//        phoneNetwork: '5-Wifi',
//        _id: 564071c84b5d82c11fa9183d } ],
//   insertedCount: 1,
//   insertedIds: [ 564071c84b5d82c11fa9183d ] }

