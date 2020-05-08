import animals from '@assets/js/animals'
import adjectives from '@assets/js/adjectives'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

function generateRandomName(adjective = '', name = '') {
  const adjectiveToReturn = adjective ? adjective : adjectives[getRandomInt(adjectives.length)]
  const nameToReturn = name ? name : animals[getRandomInt(animals.length)]

  return `${adjectiveToReturn} ${nameToReturn}`
}

export { generateRandomName }
