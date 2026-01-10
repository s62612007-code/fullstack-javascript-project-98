package app;

import static spark.Spark.*;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        port(4567);
        Gson gson = new Gson();

        get("/", (req, res) -> "Servidor Desafío Fibonacci y Aritmética activo");

        post("/start", (req, res) -> {
            GameSession session = SessionManager.createSession();
            Map<String, String> resp = new HashMap<>();
            resp.put("sessionId", session.getSessionId());
            return gson.toJson(resp);
        });

        get("/next", (req, res) -> {
            String sessionId = req.queryParams("sessionId");
            GameSession session = SessionManager.getSession(sessionId);
            if (session == null || session.isFinished()) {
                res.status(400);
                return "Session not found or finished";
            }
            Object game = session.getCurrentGame();
            Map<String, Object> question = new HashMap<>();
            if (game instanceof games.FibonacciGame) {
                question.put("type", "fibonacci");
                question.put("n", ((games.FibonacciGame) game).getN());
            } else if (game instanceof games.SqrtGame) {
                question.put("type", "sqrt");
                question.put("number", ((games.SqrtGame) game).getNumber());
            } else if (game instanceof games.ArithmeticGame) {
                question.put("type", "arithmetic");
                question.put("a", ((games.ArithmeticGame) game).getA());
                question.put("b", ((games.ArithmeticGame) game).getB());
                question.put("op", ((games.ArithmeticGame) game).getOp());
            }
            return gson.toJson(question);
        });

        post("/answer", (req, res) -> {
            Map<String, String> body = gson.fromJson(req.body(), Map.class);
            String sessionId = body.get("sessionId");
            String answer = body.get("answer");
            GameSession session = SessionManager.getSession(sessionId);
            if (session == null || session.isFinished()) {
                res.status(400);
                return "Session not found or finished";
            }
            boolean correct = session.answer(answer);
            Map<String, Object> resp = new HashMap<>();
            resp.put("correct", correct);
            if (session.isFinished()) {
                resp.put("score", session.getScore());
                resp.put("result", session.getResult());
            }
            return gson.toJson(resp);
        });
    }
}
