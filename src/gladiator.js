const gladiators = {};

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

const generateTournament = () => {
  for (let i = 0; i < 16; i++) {
    gladiators[i] = generateGladiator();
  }

  return gladiators;
};

module.exports = {
  generateTournament,
};
