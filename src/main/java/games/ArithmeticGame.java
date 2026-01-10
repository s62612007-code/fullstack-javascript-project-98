package games;

import java.util.Random;

public class ArithmeticGame {
    private int a, b, answer;
    private char op;

    public ArithmeticGame() {
        Random rand = new Random();
        this.a = rand.nextInt(20) + 1;
        this.b = rand.nextInt(20) + 1;
        this.op = rand.nextBoolean() ? '+' : '-';
        this.answer = (op == '+') ? a + b : a - b;
    }

    public int getA() { return a; }
    public int getB() { return b; }
    public char getOp() { return op; }
    public int getAnswer() { return answer; }
}
