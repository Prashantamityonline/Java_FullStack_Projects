/**
 * Demo
 */
import java.awt.*;
public class Demo {

  public static void main(String[] args) {
    
    Frame frame = new Frame();
    frame.setTitle("Prashant Singh");

    frame.setLocation(400,100);
    frame.setSize(300,300);
    frame.setLayout(null);
    frame.setVisible(true);

    Label label = new Label ("Authentication Screen");
    label.setBounds(200,100,150,20);
    frame.add(label);

    

    Button button1 = new Button("Submit");
    button1.setBounds(120,80,100,30);

    //TextArea ta =new TextArea();
    //ta.setBounds(20,20,450,270);
    //frame.add(ta);
  

   // Button button1 = new Button("Ok");
    //Button button2 = new Button("Cencel");

    //button1.setBounds(x,y,width,height);
    //button1.setBounds(120,80,100,30);
    //button2.setBounds(240,80,100,30);

    //Checkbox checkbox1 =new Checkbox("Bold");
    ///Checkbox checkbox2 =new Checkbox("Itelic");

    //checkbox1.setBounds(40,59,100,30);
   // checkbox2.setBounds(160,59,100,30);
   //frame.add(checkbox2);
    //frame.add(checkbox1);


   // CheckboxGroup checkboxGroup =new CheckboxGroup();
   // Checkbox checkbox1 = new Checkbox("Male",checkboxGroup,true);
   // Checkbox checkbox2 = new Checkbox("Female", checkboxGroup,false);
   // checkbox1.setBounds(40,59,100,30);
   // checkbox2.setBounds(160,59,100,30);
   // frame.add(checkbox1);
   // frame.add(checkbox2);
    
    
    
  
   // frame.add(button1);
   // frame.add(button2);

  }
}
