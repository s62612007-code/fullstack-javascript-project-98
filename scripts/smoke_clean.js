import readlineSync from 'readline-sync';
import runGame from '../src/index.js';
import even from '../src/games/even.js';
import calc from '../src/games/calc.js';
import gcd from '../src/games/gcd.js';
import progression from '../src/games/progression.js';
import prime from '../src/games/prime.js';

const games = [
  { name: 'even', mod: even },
  { name: 'calc', mod: calc },
  { name: 'gcd', mod: gcd },
  { name: 'progression', mod: progression },
  { name: 'prime', mod: prime },
];

let okCount = 0;
let failCount = 0;

console.log('Smoke test E2E: ejecutar cada juego con respuestas correctas simuladas');

games.forEach((g) => {
  const rounds = [];
  const originalGenerate = g.mod.generateRound;
  const mockGenerate = () => {
    const round = originalGenerate.call(g.mod);
    rounds.push(round);
    return round;
  };
  
  const gameMod = { ...g.mod, generateRound: mockGenerate };

  const inputs = ['SmokeTester'];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    if (idx === 0) {
      idx += 1;
      return inputs[0];
    }
    const roundIdx = idx - 1;
    idx += 1;
    return rounds[roundIdx] ? rounds[roundIdx].answer : '';
  };

  console.log(`\n--- Ejecutando juego: ${g.name} ---`);
  try {
    const res = runGame(gameMod);
    if (res) {
      okCount += 1;
      console.log(`Resultado: OK - ${g.name}`);
    } else {
      failCount += 1;
      console.log(`Resultado: FAIL - ${g.name}`);
    }
  } catch (err) {
    failCount += 1;
    console.error(`Error al ejecutar ${g.name}:`, err);
  }
  readlineSync.question = originalQuestion;
});

console.log('\nSmoke test E2E de fallo en primera ronda: respuesta incorrecta inmediata');
games.forEach((g) => {
  const rounds = [];
  const originalGenerate = g.mod.generateRound;
  const mockGenerate = () => {
    const round = originalGenerate.call(g.mod);
    rounds.push(round);
    return round;
  };
  
  const gameMod = { ...g.mod, generateRound: mockGenerate };

  const inputs = ['SmokeTester'];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    if (idx === 0) {
      idx += 1;
      return inputs[0];
    }
    const roundIdx = idx - 1;
    idx += 1;
    if (roundIdx === 0 && rounds[roundIdx]) {
      const first = rounds[roundIdx];
      if (first.answer === 'yes') return 'no';
      if (first.answer === 'no') return 'yes';
      const n = Number(first.answer);
      return Number.isNaN(n) ? `${first.answer}x` : String(n + 1);
    }
    return rounds[roundIdx] ? rounds[roundIdx].answer : '';
  };

  console.log(`\n--- Ejecutando fallo primera ronda para: ${g.name} ---`);
  try {
    const res = runGame(gameMod);
    if (res) {
      okCount += 1;
      console.log(`Resultado inesperado OK en fallo primera ronda - ${g.name}`);
    } else {
      failCount += 1;
      console.log(`Resultado esperado FAIL en fallo primera ronda - ${g.name}`);
    }
  } catch (err) {
    failCount += 1;
    console.error(`Error al ejecutar fallo primera ronda ${g.name}:`, err);
  }
  readlineSync.question = originalQuestion;
});

console.log('\nSmoke test E2E de fallo: primera correcta, segunda incorrecta');
games.forEach((g) => {
  const rounds = [];
  const originalGenerate = g.mod.generateRound;
  const mockGenerate = () => {
    const round = originalGenerate.call(g.mod);
    rounds.push(round);
    return round;
  };
  
  const gameMod = { ...g.mod, generateRound: mockGenerate };

  const inputs = ['SmokeTester'];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    if (idx === 0) {
      idx += 1;
      return inputs[0];
    }
    const roundIdx = idx - 1;
    idx += 1;
    if (roundIdx === 0 && rounds[roundIdx]) {
      return rounds[roundIdx].answer;
    }
    if (roundIdx === 1 && rounds[roundIdx]) {
      const second = rounds[roundIdx];
      if (second.answer === 'yes') return 'no';
      if (second.answer === 'no') return 'yes';
      const n = Number(second.answer);
      return Number.isNaN(n) ? `${second.answer}x` : String(n + 1);
    }
    return rounds[roundIdx] ? rounds[roundIdx].answer : '';
  };

  console.log(`\n--- Ejecutando fallo para: ${g.name} ---`);
  try {
    const res = runGame(gameMod);
    if (res) {
      okCount += 1;
      console.log(`Resultado inesperado OK en ruta de fallo - ${g.name}`);
    } else {
      failCount += 1;
      console.log(`Resultado esperado FAIL en ruta de fallo - ${g.name}`);
    }
  } catch (err) {
    failCount += 1;
    console.error(`Error al ejecutar fallo ${g.name}:`, err);
  }
  readlineSync.question = originalQuestion;
});

console.log(`\nResumen: OK: ${okCount}, Fallos: ${failCount}`);
