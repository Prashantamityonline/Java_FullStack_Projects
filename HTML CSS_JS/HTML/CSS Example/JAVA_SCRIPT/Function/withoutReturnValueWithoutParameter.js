function checkPrime() {
  
  let input = prompt("Enter a number:");

  
  let num = parseInt(input);
  if (isNaN(num) || num < 1) {
      console.log("Please enter a valid positive integer.");
      return;
  }

 
  let isPrime = true;

  if (num === 1) {
      isPrime = false; 
  } else {
      
      for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
              isPrime = false;
              break;
          }
      }
  }

  
  if (isPrime) {
      console.log(num + " is a prime number.");
  } else {
      console.log(num + " is not a prime number.");
  }
}


checkPrime();
