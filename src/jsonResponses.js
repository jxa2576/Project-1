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

const generateGladiators = (request, response) => {
  gladiator.generateGladiators();

  const responseJSON = {
    message: 'Generated Gladiators',
  }

  return respondJSON(request, response, 201, responseJSON);
};

const getGladiators = (request, response) => {
  const gladiators = gladiator.getGladiators();

  const responseJSON = {
    message: 'Fetch Gladiators',
    gladiators,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const hostTournament = (request, response) => {
  const winner = gladiator.gladiatorTournament();

  const responseJSON = {
    message: 'Host Tournament',
    winner,
  };

  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  generateGladiators,
  getGladiators,
  hostTournament,
};
