public class SwitchCondions {
  public static void main(String[] args) {
    int num1 = 10;
    int num2 = 5;
    char op = '*';
    int result =0;
     
    switch (op) {
      case '+':
        result = num1 + num2;
       
        
        break;
    case '-':
    result=num1 - num2;
    break;

      default:
      System.out.println("Invailed Operator");
      
        break;
    }
    System.out.println("Result is: "+ result);
    

  }
}