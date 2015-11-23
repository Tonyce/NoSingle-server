"use strict";

var ALY = require('aliyun-sdk');

// -------------------------------
// 5.4.6 Put Object
// -------------------------------
var oss = new ALY.OSS({
	accessKeyId: "WV5gzcs4Z4yRNdaM",
	secretAccessKey: "zwq3Zghr9UqIzwFpZEhgJO08Gd2EKS",
	securityToken: "",
	endpoint: 'http://oss-cn-beijing.aliyuncs.com',
	apiVersion: '2013-10-15'
});

function putObject (key, data, callback) {
	oss.putObject({
			Bucket: 'no-single',
			Key: key,                 // 注意, Key 的值不能以 / 开头, 否则会返回错误.
			Body: data,
			AccessControlAllowOrigin: '',
			ContentType: 'image/png',
			CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
			ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
			ContentEncoding: "",         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
			ServerSideEncryption: 'AES256',
			Expires: null                     // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
		},
		function (err, data) {
			if (err) {
				console.error('error:', err);
				callback({err: err})
				return;
			}
			callback()
			// console.log('success:', data);
	});
};

exports.putObject = putObject