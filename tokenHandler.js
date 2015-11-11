
'use strict';

var jwt = require('jsonwebtoken');
var clientTokenSecret = "GoodGoodStudy";
var serverToeknSecret = "GoodGoodStudyDayDayUp"

exports.signServerToken = function signServerToken (tokenInfo) {
	let token = ""
	try {
		token = jwt.sign(tokenInfo, serverToeknSecret, {"issuer": "ttangServer"});	
	}catch (err) {
		console.log("signServerToken err...")
	}
	return token;
}

exports.verifyServerToken = function verifyServerToken (token) {
	let tokenInfo = ""
	try {
		tokenInfo = jwt.verify(token, serverToeknSecret);	
	}catch (err) {
		console.log("verifyServerToken err serverToken illegal..")
	}
	return tokenInfo
}

exports.verifyClientToken = function verifyClientToken (token) {
	let tokenInfo = ""
	try {
		tokenInfo = jwt.verify(token, clientTokenSecret);
	} catch(err) {
	  	// console.log("illegal client token....")
	}
	return tokenInfo
}