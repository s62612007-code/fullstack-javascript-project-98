import { getRandomInt, isPrime } from '../utils.js';

const description = 'Responde "yes" si el número dado es primo. De lo contrario, responde "no".';

export default {
  description,
  generateRound() {
    const number = getRandomInt(1, 100);
    const answer = isPrime(number) ? 'yes' : 'no';
    return { question: String(number), answer };
  },
};
