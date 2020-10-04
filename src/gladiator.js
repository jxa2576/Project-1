const gladiators = {};
const parameters = {
  rounds: 4,
};

const editParameter = (parameter, value) => {
  console.dir(parameter);
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

const generateGladiators = () => {
  for (let i = 0; i < (2 ** parameters.rounds); i++) {
    gladiators[i] = generateGladiator();
  }
};

const getGladiators = () => gladiators;

const attack = (g1, g2) => {
  const luck = getRandomInt(0, 10);
  if (g1.luck >= luck) {
    const newGHealth = g2.health - (g1.damage - g2.defense);
    return newGHealth;
  }
  return g2.health;
};

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
    console.dir(`${glad1.name} beats ${glad2.name}`);
    return 1;
  }
  console.dir(`${glad2.name} beats ${glad1.name}`);
  return 0;
};

const gladiatorTournament = () => {
  console.dir('Hosting tournament:');

  const gladArray = Object.values(gladiators);

  while (gladArray.length > 1) {
    const duels = gladArray.length / 2;
    console.dir(`New round: ${duels} duels`);
    for (let i = 0; i < duels; i++) {
      const winner = duel(gladArray[i], gladArray[i + 1]);
      gladArray.splice(i + winner, 1);
      console.dir(`Winner ${gladArray[i].name}`);
      gladArray[i].health = 20;
    }
  }
  console.dir('Tournament Over');
  return gladArray[0];
};

module.exports = {
  editParameter,
  generateGladiators,
  getGladiators,
  gladiatorTournament,
};
