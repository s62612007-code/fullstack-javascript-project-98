# Datos para el proyecto: Desafío Fibonacci y Aritmética

Este archivo contiene los datos y contexto necesarios para el desarrollo del proyecto Java descrito en el archivo contexto.md de .vscode.

## Estructura sugerida

- `core/` - Lógica central (clases utilitarias, validaciones, temporizador, puntuación, etc.)
- `games/` - Implementaciones de los retos: Fibonacci, raíz cuadrada, aritmética 1 y aritmética 2.
- `app/` - Aplicación ejecutable y esqueleto HTTP (servidor, endpoints, gestión de sesiones).

## Reglas clave

- Cada reto debe resolverse en máximo 11 segundos (validado en el servidor).
- 4 preguntas secuenciales: 1 de Fibonacci, 1 de raíz cuadrada, 2 aritméticas.
- Cada respuesta correcta suma 1 punto.
- 3 o 4 puntos: **gano**. 0–2 puntos: **looser**.
- Endpoints HTTP mínimos:
  - `POST /start` (inicia sesión de juego, devuelve sessionId)
  - `GET /next?sessionId=...` (siguiente pregunta)
  - `POST /answer` (envía respuesta)

## Ejemplo de flujo

1. Cliente hace POST a `/start` → recibe sessionId.
2. Cliente hace GET a `/next?sessionId=...` → recibe pregunta.
3. Cliente responde vía POST `/answer`.
4. Repite hasta 4 preguntas o hasta agotar tiempo.
5. El servidor calcula y responde el resultado final.

## Notas

- No modificar ni duplicar README.md ni archivos en .github.
- Usar clases y métodos estáticos mínimos.
- Mantener la lógica simple y clara.

---

Este archivo sirve como referencia para el desarrollo y organización del proyecto.
