package app;

import core.ScoreUtils;
import core.TimerUtils;
import games.FibonacciGame;
import games.SqrtGame;
import games.ArithmeticGame;

import java.util.*;

public class GameSession {
    private final String sessionId;
    private final List<Object> games;
    private final List<Long> startTimes;
    private int current;
    private int score;
    private boolean finished;

    public GameSession() {
        this.sessionId = UUID.randomUUID().toString();
        this.games = Arrays.asList(
            new FibonacciGame(),
            new SqrtGame(),
            new ArithmeticGame(),
            new ArithmeticGame()
        );
        this.startTimes = new ArrayList<>(Arrays.asList(new Long[4]));
        this.current = 0;
        this.score = 0;
        this.finished = false;
    }

    public String getSessionId() { return sessionId; }
    public int getCurrent() { return current; }
    public boolean isFinished() { return finished; }
    public int getScore() { return score; }

    public Object getCurrentGame() {
        if (current < games.size()) {
            startTimes.set(current, System.currentTimeMillis());
            return games.get(current);
        }
        return null;
    }

    public boolean answer(String answer) {
        if (finished || current >= games.size()) return false;
        long startTime = startTimes.get(current);
        if (!TimerUtils.isWithinTime(startTime)) {
            current++;
            if (current >= games.size()) finished = true;
            return false;
        }
        Object game = games.get(current);
        boolean correct = false;
        try {
            int ans = Integer.parseInt(answer);
            if (game instanceof FibonacciGame) {
                correct = ((FibonacciGame) game).getAnswer() == ans;
            } else if (game instanceof SqrtGame) {
                correct = ((SqrtGame) game).getAnswer() == ans;
            } else if (game instanceof ArithmeticGame) {
                correct = ((ArithmeticGame) game).getAnswer() == ans;
            }
        } catch (Exception ignored) {}
        if (correct) score++;
        current++;
        if (current >= games.size()) finished = true;
        return correct;
    }

    public String getResult() {
        return ScoreUtils.getResult(score);
    }
}
