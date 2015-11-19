
//no single
//delete commit add

'use strict';

var path = require('path');
var server = require('http').createServer()
	, url = require('url')
	, WebSocketServer = require('ws').Server
	, wss = new WebSocketServer({ server: server })
	, express = require('express')
    , bodyParser = require('body-parser')
    , markdown = require('jstransformer-markdown')
	, app = express()
	, port = 3060;

var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;

var checkToken = require('./checkToken');
var tokenRouter = require('./routes/token');
var goingonRouter = require('./routes/goingon');
var focusRouter = require('./routes/focus');
var friendsRouter = require('./routes/friends');
var meRouter = require('./routes/me');
var viewsRouter = require('./routes/views')

// global._tokenHandler = tokenHandler;
global._ObjectID = ObjectID;
global._db = "";
global._dataBase = "NoSingle";
var mongoUrl = 'mongodb://localhost:27017/NoSingle';
MongoClient.connect(mongoUrl, function(err, db) {
    if(err){
        console.log("mongoClient open err", err)
        return
    }

    _db = db;
    if (!module.parent) {
        server.on('request', app);
        server.listen(port, function () { 
            console.log('Listening on ' + server.address().port);
        })
    }
});

app.set('env', process.env.NODE_ENV || "development")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// this middleware will be executed for every request to the app
// app.use(checkToken)
app.use('/token', tokenRouter);
app.use('/goingon', goingonRouter);

// need _authorizationTokenInfo
app.use('/focus', focusRouter);
app.use('/chat', friendsRouter);
app.use('/me', meRouter);

app.use('/views', viewsRouter)


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// this middleware will not allow the request to go beyond it
// app.use(function(req, res, next) {
//  res.send('Hello World');
// })

wss.on('connection', function connection(ws) {
	var location = url.parse(ws.upgradeReq.url, true);
    console.log("ws.upgradeReq")
    console.log(location)
    console.log(ws.upgradeReq.headers)
	// you might use location.query.access_token to authenticate or share sessions
	// or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
	
	let timer = ""
    ws.on('close', function  () {
        // console.log(wss.clients.length)
        // console.log(ws.readyState)
        // console.log(wss.clients.length)
        if (wss.clients.length < 1) {
            // console.log("wss.clients.length < 1, stop broadcast")
            clearInterval(timer)
        }
    })
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // ws.send(message);
        // broadcast(ws, message)
        timer = setInterval(function () {
            let nowTime = new Date().getTime()
            
            let randomFriendId = getRandomIntInclusive(1,5)
            let result = {
                "type": "friend",
                "fromId": randomFriendId,
                "toId": "me",
                "messageTime" : nowTime,
                "message": randomFriendId + " -- " + nowTime
            }
            // console.log("ws.readyState: ", ws && ws.readyState)
                
            broadcast(JSON.stringify(result), ws, 0)
        }, 5000)
    });
	// ws.on('message', function incoming(message) {
	//   console.log('received: %s', message);
	// });
	// ws.send('something');
});

function broadcast(data, ws, id) {
    wss.clients.forEach(function each(client) {
        console.log("broadcast....")
        if ( client && client.readyState === 1) {
            client.send(data);    
        }else {
            console.log("client.readyState", client.readyState)
        }
    });
};
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}