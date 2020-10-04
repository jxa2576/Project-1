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

const editParameters = (request, response, body) => {
  const responseJSON = {
    message: 'Rounds Required',
  };

  const responseCode = 204;

  console.dir(body);
  if (gladiator.editParameter('rounds', body.rounds) === 0) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const generateGladiators = (request, response) => {
  gladiator.generateGladiators();

  /* const responseJSON = {
    message: 'Generated Gladiators',
  }; */

  return respondJSONMeta(request, response, 201);
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
  editParameters,
  generateGladiators,
  getGladiators,
  hostTournament,
};
