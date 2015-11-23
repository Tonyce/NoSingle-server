
var assert = require("assert");
var ossHelper = require('./aliOss.js')
var fs = require('fs')
fs.readFile('accountImage.png', function (err, data) {
	if (err) {
		console.log('error:', err);
		return;
	}
	ossHelper.putObject("test.png", data, encoding, function (err) {
		assert.equal(err, null)
	})
})