var http = require('http'),
    WebSocketServer = require('ws').Server,
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

app.get('/ping', function(req, res) {
    var body = 'pong';
    if (req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
});

app.post('/echo', function(req, res) {
    var body = req.body.msg || '';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
});

app.post('/ifecho', function(req, res) {
    var body = '<script>window.parent.' + req.body.cb + '(' + JSON.stringify(req.body.msg) + ');</script>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
});

app.get('/10s', function(req, res) {
    setTimeout(function () {
        var body = 'It took 10 seconds to respond!';
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', Buffer.byteLength(body));
        res.end(body);
    }, 10000);
});

app.get('/jsonp', function(req, res) {
    var body = req.query.cb + '({message: "Hello World"});';
    res.setHeader('Content-Type', 'text/javascript');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
});

app.post('/upload', function(req, res) {
    console.log(req);
    var body = 'pong';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
});

var server = http.createServer(app),
    ws = new WebSocketServer({server: server});

ws.on('connection', function (ws) {
    ws.on('message', function (message) {
        ws.send(message);
    });
});


server.listen(3000);
