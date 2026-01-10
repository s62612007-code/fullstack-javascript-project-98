# Consecutivo: Desafío Fibonacci y Aritmética

Contexto

Proyecto de ejercicios numéricos en Java que presenta 4 retos secuenciales (Fibonacci, raíz cuadrada y dos ejercicios aritméticos). Cada ejercicio debe responderse en un máximo de 11 segundos. Después de completar los ejercicios se calcula la puntuación: cada respuesta correcta suma 1 punto; si el jugador obtiene 3 o 4 puntos se considera **gano**, si obtiene 0–2 puntos se considera **looser**.

Características del repositorio

- Lenguaje: Java (clases mínimas y métodos estáticos para la lógica).
- Estructura: la lógica central está en `core`; los juegos están en `games`; la aplicación ejecutable y el esqueleto HTTP están en `app`.
- Interfaz HTTP mínima: endpoints para iniciar sesión, obtener la siguiente pregunta y enviar respuestas.
- Tiempo límite: 11 segundos por pregunta (se evalúa en el servidor).

Cómo compilar y ejecutar

Requiere JDK 11+.

Compilar:

```bash
cd fullstack-java-challenge
mvn package
```

Ejecutar:

```bash
java -jar target/fullstack-java-challenge-1.0.jar
```

Endpoints principales

- `GET /` - Página web simple de prueba.
- `POST /start` - Inicia una sesión de juego (devuelve `sessionId`).
- `GET /next?sessionId=...` - Solicita la siguiente pregunta.
- `POST /answer` - Envía la respuesta: JSON `{ "sessionId": "...", "answer": "..." }`.
