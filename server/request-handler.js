/*************************************************************
You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make your Node server implement the URLs you used for your chat client (eg /classes/messages).

  var objectId = 1;
  let messages = [
    {
      username: 'Jono',
      text: 'Do my bidding!',
      roomname: 'lobby',
      objectId: objectId
    },
    {
      username: 'Jono2',
      text: 'Do my bidding2!',
      roomname: 'lobby',
      objectId: objectId
    },
    {
      username: 'Jono3',
      text: 'Do my bidding3!',
      roomname: 'lobby5',
      objectId: objectId
    }
  ];
  var pathName = url.parse(request.url).pathname;

  if (pathName === '/classes/messages') {
    if (request.method === 'GET') {
      statusCode = 200;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: messages}));

    } else if (request.method === 'POST') {
      statusCode = 201;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);

      request.on('data', function(data) {

        var stringData = JSON.parse(data.toString());
        stringData.objectId = objectId;
        messages.push(stringData);
        objectId++;
      });
      statusCode = 201;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: messages}));

    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({results: messages}));
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
  }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end('Hello, World!');
};
