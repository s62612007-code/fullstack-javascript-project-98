package core;

public class TimerUtils {
    public static final int TIME_LIMIT_SECONDS = 11;
    public static boolean isWithinTime(long startTimeMillis) {
        long now = System.currentTimeMillis();
        return (now - startTimeMillis) <= TIME_LIMIT_SECONDS * 1000;
    }
}
