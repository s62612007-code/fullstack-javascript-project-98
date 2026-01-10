package games;

import java.util.Random;

public class FibonacciGame {
    private int n;
    private int answer;

    public FibonacciGame() {
        Random rand = new Random();
        this.n = rand.nextInt(8) + 3; // n entre 3 y 10
        this.answer = fibonacci(n);
    }

    public int getN() {
        return n;
    }

    public int getAnswer() {
        return answer;
    }

    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
