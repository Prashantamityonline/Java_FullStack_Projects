
function isPerfectNumber(num) {
  let sum = 0;
  
  
  for (let i = 1; i <= num / 2; i++) {
      if (num % i === 0) {
          sum += i;
      }
  }
  
  
  return sum === num;
}

// Example usage
console.log(isPerfectNumber(6)); 
console.log(isPerfectNumber(28)); 
console.log(isPerfectNumber(12)); 
