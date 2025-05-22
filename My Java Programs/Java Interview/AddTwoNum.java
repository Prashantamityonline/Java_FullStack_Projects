public class AddTwoNum {
  // Add Two Numbers Without Using a Third Variable
  public static void main(String[] args) {
    int a = 10;
    int b = 20;

    a = a + b;
    b = a - b;
    a = a - b;

    System.out.println("After swap: a =" + a + ",b=" + b);
  }
}
