class ExampleLongBoxing{
  public static void main(String args[]){
      long number = 3466;
//Boxing
    Long num = Long.valueOf(number);
System.out.println(num);
//UnBoxing

long prashant = num.longValue();
System.out.println(prashant);


}
}