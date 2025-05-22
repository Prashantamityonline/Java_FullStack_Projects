class ExampleCasting{
     public static void main(String[] args) {
        byte a = (byte)300;
       Byte b = Byte.valueOf(a);  //Boxing
       System.out.println(a);
  //UnBoxing
  byte c = b.byteValue();
 System.out.println(c);
      
   }
}