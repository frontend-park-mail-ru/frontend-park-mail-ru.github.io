var http = require('http'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public_html'));

app.get('/styles.css', function(req, res) {
    setTimeout(function () {
        var body = '';
        res.setHeader('Content-Type', 'text/css');
        res.setHeader('Content-Length', Buffer.byteLength(body));
        res.end(body);
    }, (req.query.t || 0) * 1000);
});

app.get('/script.js', function(req, res) {
    setTimeout(function () {
        var body = 'document.write("<p>ЭТОТ HTML БЫЛ ВСТАВЛЕН СКРИПТОМ.</p>")';
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Content-Length', Buffer.byteLength(body));
        res.end(body);
    }, (req.query.t || 0) * 1000);
});

app.get('/image.gif', function(req, res) {
    setTimeout(function () {
        var body = new Buffer('R0lGODdhAQABAPAAACMfIQAAACwAAAAAAQABAAACAkQBADs=', 'base64');
        res.setHeader('Content-Type', 'image/gif');
        res.setHeader('Content-Length', body.length);
        res.end(body);
    }, (req.query.t || 0) * 1000);
});

var server = http.createServer(app);

server.listen(3000);
