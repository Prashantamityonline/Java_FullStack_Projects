class PrimeExample{
   public static void main(String[] args){
      int i = 1;
     int num = 2;
     int count = 0;
 for(i = 1; i <= num; i++){
      if(num % i ==0) {
        count++;
   }
}
if(count == 2){
   System.out.println("Prime Number");
}else{
     System.out.println("Not Prime Number");
   }   
 }
}