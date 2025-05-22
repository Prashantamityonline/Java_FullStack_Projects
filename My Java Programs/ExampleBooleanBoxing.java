class ExampleBooleanBoxing{
   public static void main(String args[]){
     boolean x = true;
//Boxing
    Boolean y =  Boolean.valueOf(x);
 System.out.println(y);
 
//UnBoxing
 boolean z =  y.booleanValue();
 System.out.println(z);

    
   }

}