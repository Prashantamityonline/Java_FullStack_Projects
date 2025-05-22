public class PrimeNumber {
  public static void main(String[] args) {
    int num =7;
    int ctr;
    ctr =2;
    boolean flag = true;
    while (ctr<num/2) {
      if(num%ctr==0){
        flag =false;
        System.out.println("no is not Prime");
        break;
      }
      ctr= ctr+1;

    }if (flag == true) {
      System.out.println("NO is Prime");
    }
  }
}
