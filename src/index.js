import readlineSync from 'readline-sync';

function normalizeAnswer(a) {
  return String(a).trim().toLowerCase();
}

export default function runGame(game) {
  console.log('¡Bienvenido a Brain Games!');
  const name = readlineSync.question('¿Cuál es tu nombre? ');
  console.log(`¡Hola, ${name}!`);
  if (game.description) {
    console.log(game.description);
  }

  const rounds = 3;
  for (let i = 0; i < rounds; i += 1) {
    const { question, answer } = game.generateRound();
    console.log(`Pregunta: ${question}`);
    const userAnswer = readlineSync.question('Tu respuesta: ');
    if (normalizeAnswer(userAnswer) !== normalizeAnswer(answer)) {
      console.log(`'${userAnswer}' es una respuesta incorrecta ;(. La respuesta correcta era '${answer}'.`);
      console.log(`¡Intentémoslo de nuevo, ${name}!`);
      return false;
    }
    console.log('¡Correcto!');
  }
  console.log(`¡Felicidades, ${name}!`);
  return true;
}
