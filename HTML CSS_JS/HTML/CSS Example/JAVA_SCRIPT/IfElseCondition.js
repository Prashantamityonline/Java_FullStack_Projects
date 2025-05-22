/*let dayNumber = Number (prompt("Enter the Day"))
if (dayNumber == 1) {
  document.write("Monday");
} else if (dayNumber == 2) {
  document.write("Tuesday");
} else if (dayNumber == 3) {
   document.write("Wednesday");
} else if (dayNumber == 4) {
   document.write("Thursday");
} else if (dayNumber == 5) {
   document.write("Friday");
} else if (dayNumber == 6) {
 document.write("Saturday");
} else if (dayNumber == 7) {
   document.write("Sunday");
} else {
  dayName = "Invalid day number. Please enter a number between 1 and 7.";
}*/
var ch = prompt("Enter a Single Character");
if(ch.length !==1)
  document.write("Invailed")
else{
  if(ch >= 'a' &&ch<='z'){
    if(ch == 'a' || ch=='e'||ch=='i'||ch=='o'|| ch=='u')
      document.write(`'${ch}' is a lower case Vowel`)
    else
    document.write(`'${ch}'is a Upper Case Consonant`)
  }
  else if(ch >='0' && ch <= '9')
  document.write(1`'${ch}' is a Digit`)
else if (ch== '')
document.write(`'${ch}'is a space`)
else 
document.write(`'${ch}'is Not a Space`)


  
}