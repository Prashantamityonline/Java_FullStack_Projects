class ExampleDoubleBoxing{
public static void main(String[] args) 
{
      	double num = 3783.39;
	//Boxing
	Double x = Double.valueOf(num);
 	//System.out.println(x);
	// UnBoxing

double z = x.doubleValue();
System.out.println(z);



     

 }

}