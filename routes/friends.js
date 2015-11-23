
"use strict"

var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	// let headers = req.headers;
    // console.log('headers:', headers);
    // if (req._authorizationTokenInfo) {
    	next();	
    // }else {
    // 	req.render('error')
    // }
})
router.get('/friends', function(req, res, next) {
	var friends = [
		{
			"_id"         : "5640e3522bde38033066758d",
		    "userName"        : "小薇",
		    "userImageUrl"    : "https://tower.im/assets/default_avatars/winter.jpg",
		    "believeWord" : "好好学习，天天向上",
		    "lastWord"    : "",
		    "lastWordTime": ""
		},
		{
			"_id"         : "56444350631c99b8f707a337",
		    "userName"        : "tonyce",
		    "userImageUrl"    : "https://tower.im/assets/default_avatars/cloud.jpg",
		    "believeWord" : "天天学习，好好向上。。。",
		    "lastWord"    : "",
		    "lastWordTime": ""
		},
		{
			"_id"         : "56444350631c99b8f707a337",
		    "userName"        : "TTang",
		    "userImageUrl"    : "https://tower.im/assets/default_avatars/nightfall.jpg",
		    "believeWord" : "学习，好好。。",
		    "lastWord"    : "",
		    "lastWordTime": ""
		}
	]
  	res.send(friends);
});

router.get('/teams', function(req, res, next) {
	var teams = [
		{
			"_id"         : "5640e3522bde38033066758d",
			"teammates" : [
				{
					"_id": "5640e3522bde38033066758d",
				    "userName"        : "小薇",
				    "userImageUrl"    : "https://tower.im/assets/default_avatars/winter.jpg",
				    "believeWord" : "好好学习，天天向上",
				    "lastWord"    : "",
				    "lastWordTime": ""	
				},
				{
					"_id"         : "56444350631c99b8f707a337",
				    "userName"        : "tonyce",
				    "userImageUrl"    : "https://tower.im/assets/default_avatars/cloud.jpg",
				    "believeWord" : "天天学习，好好向上。。。",
				    "lastWord"    : "",
				    "lastWordTime": ""
				}
			],
			"lastSpeakerId":"56444350631c99b8f707a337",
			"lastWord": "",
			"lastWordTime": ""
		},
		{
			"_id"         : "56444350631c99b8f707a337",
			"teammates" : [
				{
					"_id": "56444350631c99b8f707a337",
					"userName"    : "TTang",
				    "userImageUrl": "https://tower.im/assets/default_avatars/nightfall.jpg",
				    "believeWord" : "学习，好好。。",
				    "lastWord"    : "",
				    "lastWordTime": ""		
				},
				{
					"_id"         : "56444350631c99b8f707a337",
				    "userName"        : "tonyce",
				    "userImageUrl"    : "https://tower.im/assets/default_avatars/cloud.jpg",
				    "believeWord" : "天天学习，好好向上。。。",
				    "lastWord"    : "",
				    "lastWordTime": ""
				}
			],
			"lastSpeakerId":"56444350631c99b8f707a337",
			"lastWord": "",
			"lastWordTime": ""
		}
	]
  	res.send(teams);
});
module.exports = router;