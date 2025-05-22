public class ReverseString {
  public static void main(String[] args) {
    String str = "abcd";
    String reverse_str = new StringBuilder(str).reverse().toString();
    System.out.println(reverse_str);
  }
}
