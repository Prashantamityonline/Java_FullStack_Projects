class ExampleShortBoxing{
   public static void main(String args[]){
     short x = 1;
//Boxing
    Short y =  Short.valueOf(x);
 System.out.println(y);
 
//UnBoxing
 short z =  y.shortValue();
 System.out.println(z);

    
   }

}