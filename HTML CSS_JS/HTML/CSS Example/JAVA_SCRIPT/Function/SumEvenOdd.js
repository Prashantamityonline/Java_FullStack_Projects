function sumEvenOdd(start, end) {
  let sumEven = 0;
  let sumOdd = 0;
  
  for (let i = start; i <= end; i++) {
    if(i % 2 == 0){
       sumEven += i;

    }else{
      sumOdd += i;
    }
  }
  console.log(`Sum of even numbers between ${start} and ${end}: ${sumEven}`);
  console.log(`Sum of odd numbers between ${start} and ${end}: ${sumOdd}`);
}
sumEvenOdd(1, 10);
