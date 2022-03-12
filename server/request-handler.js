/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var qs = require('querystring');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

var storage = [];
var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;

  // const {methods, url } = request;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(storage));
    }
    if (request.method === 'POST') {
      var requestBody = '';
      response.writeHead(201, 'Content-Type', 'application/json');
      request.on('data', function(data) {
        // console.log(Buffer.toString(data));
        requestBody += data;
      });
      request.on('end', function() {
        var formData = qs.parse(requestBody);
        var keys = Object.keys(formData);
        var dataObject = JSON.parse(keys[0]);
        storage.push(dataObject);
      });
      response.end('post completed');
    }
    if (request.method === 'OPTIONS') {
      response.statusCode = 200;
      response.writeHead(200, 'Content-Type', 'text/plain');
      response.end('Allow: Get, Post, Options');
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }
};



exports.requestHandler = requestHandler;