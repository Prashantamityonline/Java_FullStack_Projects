import java.awt.Frame;
import java.awt.List;
public class RedioButton {
  public static void main(String[] args) {
    Frame frame = new Frame();
    frame.setTitle("Dummy Promo");
    frame.setLocation(400, 400);
    frame.setSize(500,300);

    List l = new List();
    l.add("mohit");
    l.add("Prashant Singh");
    l.add("Ashu Kumar");
    l.add("Akash Yadav");
    l.add("Vishnu Kumar");
    l.add("Rakesh Singh");
    l.add("Harish Kumar");

    frame.add(l);
    frame.setVisible(true);
  }


  
}
