package app;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class SessionManager {
    private static final Map<String, GameSession> sessions = new ConcurrentHashMap<>();

    public static GameSession createSession() {
        GameSession session = new GameSession();
        sessions.put(session.getSessionId(), session);
        return session;
    }

    public static GameSession getSession(String sessionId) {
        return sessions.get(sessionId);
    }
}
