class ElseIfExample{
   public static void main(String[] args) {
     int marks = 100; 
      if(marks > 80){
      System.out.println("Topper");
    } else if (marks < 80 && marks >= 60) 
{
     System.out.println("First");
    
 }else if(marks <= 60 && marks >= 45)
{
    System.out.println("Second");
   }else{
 System.out.println("Failed");
}
  }
}