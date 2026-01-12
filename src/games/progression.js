import { getRandomInt } from '../utils.js';

const description = '¿Qué número falta en la progresión?';

function makeProgression(start, step, length) {
  const res = [];
  for (let i = 0; i < length; i += 1) {
    res.push(start + i * step);
  }
  return res;
}

export default {
  description,
  generateRound() {
    const length = 10;
    const start = getRandomInt(1, 20);
    const step = getRandomInt(1, 10);
    const prog = makeProgression(start, step, length);
    const hideIndex = getRandomInt(0, length - 1);
    const answer = String(prog[hideIndex]);
    const question = prog.map((v, i) => (i === hideIndex ? '..' : String(v))).join(' ');
    return { question, answer };
  },
};
