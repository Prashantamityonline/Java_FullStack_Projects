import java.util.Scanner;

public class NumberSearch {

  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 4, 5 };

    Scanner scanner = new Scanner(System.in);
    System.out.print("Enter number to search: ");
    int searchNum = scanner.nextInt();

    boolean exist = false;
    for (int num : arr) {
      if (num == searchNum) {
        exist = true;
        break;
      }
    }
    if (exist) {
      System.out.println("Number exists in array");
    } else {
      System.out.println("Number does not exist in array");
    }

    scanner.close();
  }
}
