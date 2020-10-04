const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Server base, pulled from API Assignment II

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/editParameters') {
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.editParameters(request, response, bodyParams);
    });
  }
};

// HANDLE PARAMS FOR SEARCH IN HALL OF FAME?????
const handleGet = (request, response, parsedUrl, params) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/generateGladiators') {
    jsonHandler.generateGladiators(request, response);
  } else if (parsedUrl.pathname === '/getGladiators') {
    jsonHandler.getGladiators(request, response);
  } else if (parsedUrl.pathname === '/hostTournament') {
    jsonHandler.hostTournament(request, response);
  } else if (parsedUrl.pathname === '/hallOfFame') {
    jsonHandler.hallOfFame(request, response, params);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
