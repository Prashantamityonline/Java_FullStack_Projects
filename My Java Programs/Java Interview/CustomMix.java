public class CustomMix {
  public static void main(String[] args) {
    String s1 = "Aadi";
    String s2 = "Java";
    // Output = aaavaiJ

    int n1 = s1.length();
    int n2 = s2.length();

    int i = 0;
    int j = n2 - 1;

    StringBuilder result = new StringBuilder();

    // Use curly braces for correct block execution
    while (i < n1 && j >= 0) {
      result.append(s1.charAt(i));
      result.append(s2.charAt(j));
      i++;
      j--;
    }

    System.out.println("Output: " + result.toString());
  }
}
