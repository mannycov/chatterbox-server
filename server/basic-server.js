/* Import node's http module: */
var http = require('http');
var rh = require('./request-handler');


var port = 3000;
var ip = '127.0.0.1';
var server = http.createServer(rh.requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);


