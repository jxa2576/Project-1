const gladiator = require('./gladiator.js');

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getGladiators = (request, response) => {
  const gladiators = gladiator.generateTournament();

  const responseJSON = {
    message: 'Fetched Gladiators',
    gladiators,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response, method) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  const responseCode = 404;

  if (method === 'GET') {
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getGladiators,
  notFound,
};
