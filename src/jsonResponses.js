const gladiators = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getRandomInt = (mn, mx) => {
  const min = Math.ceil(mn);
  const max = Math.floor(mx + 1);
  return Math.floor(Math.random() * (max - min) + min);
};

const generateGladiator = () => {
  const gladiator = {
    name: getRandomInt(500, 1000),
    health: 10,
    damage: getRandomInt(1, 3),
    luck: getRandomInt(1, 9),
  };

  return gladiator;
};

const getGladiators = (request, response) => {
  for (let i = 0; i < 16; i++) {
    gladiators[i] = generateGladiator();
  }

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
