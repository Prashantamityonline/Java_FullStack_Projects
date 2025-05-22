class ByteAdditionExample1 {
    public static void main(String[] args) {
       Byte x = (byte)100;
       Byte a =Byte.valueOf(x);
       Byte y = (byte)10;
       Byte b= Byte.valueOf(y);
       Byte z = (byte)(a.byteValue()+b.byteValue());
       Byte d=Byte.valueOf(z);        
 System.out.println(d.byteValue());

}
}                                                                                                

