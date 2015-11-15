
"use strict"

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
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
module.exports = router;