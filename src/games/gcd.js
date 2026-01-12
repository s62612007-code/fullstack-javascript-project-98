import { getRandomInt, gcd } from '../utils.js';

const description = 'Encuentra el máximo común divisor de los números dados.';

export default {
  description,
  generateRound() {
    const a = getRandomInt(1, 100);
    const b = getRandomInt(1, 100);
    const question = `${a} ${b}`;
    const answer = String(gcd(a, b));
    return { question, answer };
  },
};
