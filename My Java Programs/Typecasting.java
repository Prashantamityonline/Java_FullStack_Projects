class Typecasting{
 public static void main(String [] args) {
  int a = 80;
   Integer x = Integer.valueOf(a);  //Boxing
   System.out.println(a);
   int y = x.intValue();
   System.out.println(y);
 }
}