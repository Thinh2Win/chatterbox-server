/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var body = [];
var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  // headers['Content-Type'] = 'text/plain';
  var headers = defaultCorsHeaders;
  const {methods, url } = request;
  if (url === '/classes/messages') {
    if (request.method === 'GET') {
      response.writeHead(200, 'Content-Type', 'application/json');
      response.end(JSON.stringify(body));
    }
    if (request.method === 'POST') {
      response.writeHead(201, 'Content-Type', 'application/json');
      response.end();
    }
    if (request.method === 'OPTIONS') {
      response.statusCode = 200;
      response.writeHead(200, 'Content-Type', 'text/plain');
      response.end('Allow: Get, Post, Options');
    }
  }
  response.writeHead(statusCode, headers);
  response.end();
};



exports.requestHandler = requestHandler;