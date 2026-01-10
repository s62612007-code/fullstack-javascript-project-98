package core;

public class ScoreUtils {
    public static String getResult(int score) {
        if (score >= 3) {
            return "gano";
        } else {
            return "looser";
        }
    }
}
