class Pattern {
   public static void main(String[] args) {
      int ctr = 1;
      while (ctr <= 3) {
         int ptr = 2;
         while (ptr <= 2) {
            System.out.print("A");
            ptr = ptr + 1;
         }
      }
      System.out.println();
      ctr = ctr + 1;
   }
}