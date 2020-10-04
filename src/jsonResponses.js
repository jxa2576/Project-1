const gladiator = require('./gladiator.js');

// Pulled from API Assignment II

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Calls editParameter in Gladiator.js
const editParameters = (request, response, body) => {
  const responseJSON = {
    message: 'Rounds Required',
  };

  const responseCode = 204;

  if (gladiator.editParameter('rounds', body.rounds) === 0) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// Calls generateGladiators in Gladiator.js
const generateGladiators = (request, response) => {
  gladiator.generateGladiators();

  const responseJSON = {
    message: 'Generated Gladiators',
    state: 1,
  };

  return respondJSON(request, response, 201, responseJSON);
};

// Calls getGladiators in Gladiator.js
const getGladiators = (request, response) => {
  const gladiators = gladiator.getGladiators();

  const responseJSON = {
    message: 'Fetch Gladiators',
    gladiators,
    state: 2,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// Calls gladiatorTournament in Gladiator.js
const hostTournament = (request, response) => {
  const winner = gladiator.gladiatorTournament();

  const responseJSON = {
    message: 'Hosted Tournament',
    winner,
    state: 3,
  };

  return respondJSON(request, response, 200, responseJSON);
};

// Calls getWinners in Gladiator.js and checks for User Search of the history of winners
const hallOfFame = (request, response, params) => {
  const winners = gladiator.getWinners();
  let searchResult = 0;

  // Check data based on params - Name for now
  Object.values(winners).forEach((winner) => {
    if (winner.name.toString() === params.name) {
      searchResult = winner;
    }
  });

  const responseJSON = {
    message: 'Hall of Fame',
    winners,
    searchResult,
  };

  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  editParameters,
  generateGladiators,
  getGladiators,
  hostTournament,
  hallOfFame,
};
