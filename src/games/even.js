import { getRandomInt } from '../utils.js';

const description = 'Responde "yes" si el número es par, de lo contrario responde "no".';

export default {
  description,
  generateRound() {
    const number = getRandomInt(1, 100);
    const answer = number % 2 === 0 ? 'yes' : 'no';
    return { question: String(number), answer };
  },
};
