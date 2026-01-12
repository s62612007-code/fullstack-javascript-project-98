// Smoke test runner for all games (E2E simulated input)
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

for (const g of games) {
  const answers = [];
  for (let i = 0; i < 3; i += 1) {
    const { answer } = g.mod.generateRound();
    answers.push(answer);
  }

  const inputs = ['SmokeTester', ...answers];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => inputs[idx++] ?? '';

  console.log(`\n--- Ejecutando juego: ${g.name} ---`);
  try {
    const res = runGame(g.mod);
    if (res) { okCount += 1; console.log(`Resultado: OK - ${g.name}`); }
    else { failCount += 1; console.log(`Resultado: FAIL - ${g.name}`); }
  } catch (err) {
    failCount += 1;
    console.error(`Error al ejecutar ${g.name}:`, err);
  }
  readlineSync.question = originalQuestion;
}

console.log('\nSmoke test E2E de fallo en primera ronda: respuesta incorrecta inmediata');
for (const g of games) {
  const first = g.mod.generateRound();
  let wrong;
  if (first.answer === 'yes') wrong = 'no';
  else if (first.answer === 'no') wrong = 'yes';
  else { const n = Number(first.answer); wrong = Number.isNaN(n) ? (first.answer + 'x') : String(n + 1); }

  const inputs = ['SmokeTester', wrong];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => inputs[idx++] ?? '';

  console.log(`\n--- Ejecutando fallo primera ronda para: ${g.name} ---`);
  try {
    const res = runGame(g.mod);
    if (res) { okCount += 1; console.log(`Resultado inesperado OK en fallo primera ronda - ${g.name}`); }
    else { failCount += 1; console.log(`Resultado esperado FAIL en fallo primera ronda - ${g.name}`); }
  } catch (err) {
    failCount += 1;
    console.error(`Error al ejecutar fallo primera ronda ${g.name}:`, err);
  }
  readlineSync.question = originalQuestion;
}

console.log('\nSmoke test E2E de fallo: primera correcta, segunda incorrecta');
for (const g of games) {
  const first = g.mod.generateRound();
  const second = g.mod.generateRound();
  let wrong;
  if (second.answer === 'yes') wrong = 'no';
  else if (second.answer === 'no') wrong = 'yes';
  else { const n = Number(second.answer); wrong = Number.isNaN(n) ? (second.answer + 'x') : String(n + 1); }

  const inputs = ['SmokeTester', first.answer, wrong];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => inputs[idx++] ?? '';

  console.log(`\n--- Ejecutando fallo para: ${g.name} ---`);
  try {
    const res = runGame(g.mod);
    if (res) { okCount += 1; console.log(`Resultado inesperado OK en ruta de fallo - ${g.name}`); }
    else { failCount += 1; console.log(`Resultado esperado FAIL en ruta de fallo - ${g.name}`); }
  } catch (err) {
    failCount += 1;
    console.error(`Error al ejecutar fallo ${g.name}:`, err);
  }
  readlineSync.question = originalQuestion;
}

console.log(`\nResumen: OK: ${okCount}, Fallos: ${failCount}`);

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

for (const g of games) {
  // Prepare three correct answers by calling generateRound
  const answers = [];
  for (let i = 0; i < 3; i += 1) {
    const { answer } = g.mod.generateRound();
    answers.push(answer);
  }

  // The first question is the user's name; provide a dummy name, then the 3 answers
  const inputs = ['SmokeTester', ...answers];

  // Mock readlineSync.question used by runGame
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    const out = inputs[idx] ?? '';
    idx += 1;
    return out;
  };

  console.log(`\n--- Ejecutando juego: ${g.name} ---`);
  try {
    const res = runGame(g.mod);
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

  // Restore original
  readlineSync.question = originalQuestion;
}

// Smoke test: fallo en la primera ronda (respuesta incorrecta inmediata)
console.log('\nSmoke test E2E de fallo en primera ronda: respuesta incorrecta inmediata');
for (const g of games) {
  const first = g.mod.generateRound();

  let wrong;
  if (first.answer === 'yes') wrong = 'no';
  else if (first.answer === 'no') wrong = 'yes';
  else {
    const n = Number(first.answer);
    wrong = Number.isNaN(n) ? (first.answer + 'x') : String(n + 1);
  }

  const inputs = ['SmokeTester', wrong];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    const out = inputs[idx] ?? '';
    idx += 1;
    return out;
  };

  console.log(`\n--- Ejecutando fallo primera ronda para: ${g.name} ---`);
  try {
    const res = runGame(g.mod);
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
}

// Ahora probar la ruta de fallo: primera respuesta correcta, segunda incorrecta
console.log('\nSmoke test E2E de fallo: primera correcta, segunda incorrecta');
for (const g of games) {
  // generate two rounds to get answers
  const first = g.mod.generateRound();
  const second = g.mod.generateRound();

  let wrong;
  if (second.answer === 'yes') wrong = 'no';
  else if (second.answer === 'no') wrong = 'yes';
  else {
    // numeric or other -> pick different value
    const n = Number(second.answer);
    wrong = Number.isNaN(n) ? (second.answer + 'x') : String(n + 1);
  }

  const inputs = ['SmokeTester', first.answer, wrong];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    const out = inputs[idx] ?? '';
    idx += 1;
    return out;
  };

  console.log(`\n--- Ejecutando fallo para: ${g.name} ---`);
  try {
    const res = runGame(g.mod);
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
}

console.log(`\nResumen: OK: ${okCount}, Fallos: ${failCount}`);
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

console.log('Smoke test E2E: ejecutar cada juego con respuestas correctas simuladas');

for (const g of games) {
  // Prepare three correct answers by calling generateRound
  const answers = [];
  for (let i = 0; i < 3; i += 1) {
    const { answer } = g.mod.generateRound();
    answers.push(answer);
  }

  // The first question is the user's name; provide a dummy name, then the 3 answers
  const inputs = ['SmokeTester', ...answers];

  // Mock readlineSync.question used by runGame
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    const out = inputs[idx] ?? '';
    idx += 1;
    return out;
  };

  console.log(`\n--- Ejecutando juego: ${g.name} ---`);
  try {
    runGame(g.mod);
    console.log(`Resultado: OK - ${g.name}`);
  } catch (err) {
    console.error(`Error al ejecutar ${g.name}:`, err);
  }

  // Restore original
  readlineSync.question = originalQuestion;
}

  // Smoke test: fallo en la primera ronda (respuesta incorrecta inmediata)
  console.log('\nSmoke test E2E de fallo en primera ronda: respuesta incorrecta inmediata');
  for (const g of games) {
    const first = g.mod.generateRound();

    let wrong;
    if (first.answer === 'yes') wrong = 'no';
    else if (first.answer === 'no') wrong = 'yes';
    else {
      const n = Number(first.answer);
      wrong = Number.isNaN(n) ? (first.answer + 'x') : String(n + 1);
    }

    const inputs = ['SmokeTester', wrong];
    const originalQuestion = readlineSync.question;
    let idx = 0;
    readlineSync.question = () => {
      const out = inputs[idx] ?? '';
      idx += 1;
      return out;
    };

    console.log(`\n--- Ejecutando fallo primera ronda para: ${g.name} ---`);
    try {
      runGame(g.mod);
      console.log(`Resultado: Ruta de fallo primera ronda - ${g.name}`);
    } catch (err) {
      console.error(`Error al ejecutar fallo primera ronda ${g.name}:`, err);
    }

    readlineSync.question = originalQuestion;
  }

// Ahora probar la ruta de fallo: primera respuesta correcta, segunda incorrecta
console.log('\nSmoke test E2E de fallo: primera correcta, segunda incorrecta');
for (const g of games) {
  // generate two rounds to get answers
  const first = g.mod.generateRound();
  const second = g.mod.generateRound();

  let wrong;
  if (second.answer === 'yes') wrong = 'no';
  else if (second.answer === 'no') wrong = 'yes';
  else {
    // numeric or other -> pick different value
    const n = Number(second.answer);
    wrong = Number.isNaN(n) ? (second.answer + 'x') : String(n + 1);
  }

  const inputs = ['SmokeTester', first.answer, wrong];
  const originalQuestion = readlineSync.question;
  let idx = 0;
  readlineSync.question = () => {
    const out = inputs[idx] ?? '';
    idx += 1;
    return out;
  };

  console.log(`\n--- Ejecutando fallo para: ${g.name} ---`);
  try {
    runGame(g.mod);
    console.log(`Resultado: Ruta de fallo ejecutada - ${g.name}`);
  } catch (err) {
    console.error(`Error al ejecutar fallo ${g.name}:`, err);
  }

  readlineSync.question = originalQuestion;
}
