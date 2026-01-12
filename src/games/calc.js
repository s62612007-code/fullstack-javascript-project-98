import { getRandomInt } from '../utils.js';

const description = '¿Cuál es el resultado de la expresión?';

function compute(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    default: return null;
  }
}

export default {
  description,
  generateRound() {
    const a = getRandomInt(1, 25);
    const b = getRandomInt(1, 25);
    const ops = ['+', '-', '*'];
    const op = ops[getRandomInt(0, ops.length - 1)];
    const question = `${a} ${op} ${b}`;
    const answer = String(compute(a, b, op));
    return { question, answer };
  },
};
