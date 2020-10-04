const gladiators = {};
const parameters = {
  rounds: 4,
};
/* const state = {
  currentState: 0,
  states: ['generate', 'get', 'host', 'winner'],
}; */
const winners = {};

// Edit above parameter object. Potential to add more, to increase user control
const editParameter = (parameter, value) => {
  if (parameters[parameter]) {
    parameters[parameter] = value;
    return 1;
  }
  return 0;
};

// Random int from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (mn, mx) => {
  const min = Math.ceil(mn);
  const max = Math.floor(mx + 1);
  return Math.floor(Math.random() * (max - min) + min);
};

// Randomly generates a Gladiator
const generateGladiator = () => {
  const gladiator = {
    name: getRandomInt(500, 1000),
    health: 20,
    damage: getRandomInt(4, 6),
    defense: getRandomInt(0, 3),
    luck: getRandomInt(5, 9),
  };

  return gladiator;
};

// Based on the amount of rounds, 2-10, generates the tournament array
const generateGladiators = () => {
  Object.keys(gladiators).forEach((gladiator) => {
    delete gladiators[gladiator];
  });
  for (let i = 0; i < (2 ** parameters.rounds); i++) {
    gladiators[i] = generateGladiator();
  }
};

// Grabs the object holding the gladiators
const getGladiators = () => gladiators;

// The first gladiator attempts to hit the second gladiator
const attack = (g1, g2) => {
  const luck = getRandomInt(0, 10);
  if (g1.luck >= luck) {
    const newGHealth = g2.health - (g1.damage - g2.defense);
    return newGHealth;
  }
  return g2.health;
};

// Intiates a fight between two gladiators
const duel = (gladiator1, gladiator2) => {
  const glad1 = gladiator1;
  const glad2 = gladiator2;

  while (glad1.health > 0 && glad2.health > 0) {
    glad2.health = attack(glad1, glad2);

    if (glad2.health > 0) {
      glad1.health = attack(glad2, glad1);
    }
  }

  if (glad1.health > 0) {
    return 1;
  }
  return 0;
};

// Conducts the gladiator tournament passing the winner on
const gladiatorTournament = () => {
  const gladArray = Object.values(gladiators);

  // Conducts the fights, kicking the loser out of the array
  while (gladArray.length > 1) {
    const duels = gladArray.length / 2;
    for (let i = 0; i < duels; i++) {
      const winner = duel(gladArray[i], gladArray[i + 1]);
      gladArray.splice(i + winner, 1);
      gladArray[i].health = 20;
    }
  }
  const tournamentWinner = gladArray[0];
  winners[Date.now()] = tournamentWinner;

  return gladArray[0];
};

// Get the winner object
const getWinners = () => winners;

module.exports = {
  editParameter,
  generateGladiators,
  getGladiators,
  gladiatorTournament,
  getWinners,
};
