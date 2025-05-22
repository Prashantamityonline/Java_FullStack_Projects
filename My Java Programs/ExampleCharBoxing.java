class ExampleCharBoxing{
   public static void main(String args[]){
     char x = 'g';
//Boxing
    Character  y =  Character.valueOf(x);
 //System.out.println(y);
 
//UnBoxing
 char z =  y.charValue();
 System.out.println(z);

    
   }

}