class ExampleFloatBoxing {
     public static void main(String args[]) {
      float num = 234.86f;
//Boxing
    Float g = Float.valueOf(num);
System.out.println(g);
// UnBoxing

float h = g.floatValue();
 System.out.println(h);


}
  
}

