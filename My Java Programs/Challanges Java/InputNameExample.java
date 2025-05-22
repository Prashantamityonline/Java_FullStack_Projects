import java.util.Scanner;

class InputNameExample{
  public static void main(String[] args) {
      System.out.print("Please enter your name: ");
        try (Scanner input = new Scanner(System.in)) {
          String name = input.nextLine();
           System.out.println("Welcome " + name + " Learn Coding");
        }

  }

}