
"use strict"

var tokenHandler = require('./tokenHandler');
var checkToken = function (req, res, next) {
   
    let headers = req.headers;
	let clientToken = headers["x-client-token"]
	let tempToken = headers["x-authorization-temp-token"]
    let authorizationToken = headers["authorization"]
    
	
    let clientTokenInfo = clientToken ? tokenHandler.verifyClientToken(clientToken) : "";
	let tempTokenInfo = tempToken ?  tokenHandler.verifyServerToken(tempToken) : "";
    let authorizationTokenInfo = authorizationToken ? tokenHandler.verifyServerToken(authorizationToken) : "";

	if (!tempTokenInfo && !clientTokenInfo) {
		res.status(401).send({err: "Unauthorized"})
		return 
	}
    req._clientTokenInfo = clientTokenInfo
    req._tempTokenInfo = tempTokenInfo
    // console.log(authorizationTokenInfo)
    if (authorizationTokenInfo && authorizationTokenInfo.userId) {
   		req._authorizationTokenInfo = authorizationTokenInfo
   	}
    
	// console.log('-------------------------------------------');
	// console.log('Time: %d', Date.now(), req.ip);
	// console.log('-------------------------------------------');
	// console.log('headers:', headers);
	// console.log('-------------------------------------------');
	// console.log('clientTokenInfo:', clientTokenInfo);
	// console.log('-------------------------------------------');
	// console.log(tempTokenInfo);
	next();
}
module.exports = checkToken;


