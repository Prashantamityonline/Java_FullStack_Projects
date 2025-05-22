public class RemoveNum {
  public static void main(String[] args) {
    // String str1 = "Learn4567754With56654Prashant";//remove number
    String str1 = "Learn4567754With56654Prashant"; // remove text

    String str2 = str1.replaceAll("[A-z]", "");

    System.out.println(str2);

  }
}
