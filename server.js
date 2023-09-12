var http = require('http'),
  fs = require('fs'),
  port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (request, response) {
  if (request.url === '/listings' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });

    response.end(listingData);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('404 Not Found');
  }
};

fs.readFile('listings.json', 'utf8', function (err, data) {
  //Check for errors
  if (err) {
    throw err;
  }

  //Save the data in the listingData variable already defined
  listingData = data;

  //Creates the server
  server = http.createServer(requestHandler);

  //Start the server
  server.listen(port, function () {
    // Once the server is listening, this callback function is executed
    console.log('Server listening on: http://192.168.0.190:' + port);
  });

  console.log('Is the server started?');
});
