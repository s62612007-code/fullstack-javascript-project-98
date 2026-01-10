package games;

import java.util.Random;

public class SqrtGame {
    private int number;
    private int answer;

    public SqrtGame() {
        Random rand = new Random();
        this.number = (rand.nextInt(10) + 1) * (rand.nextInt(10) + 1); // cuadrado perfecto entre 1 y 100
        this.answer = (int) Math.sqrt(number);
    }

    public int getNumber() {
        return number;
    }

    public int getAnswer() {
        return answer;
    }
}
