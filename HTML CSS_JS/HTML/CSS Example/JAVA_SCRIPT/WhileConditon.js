/*var i = 1
while (i <= 10){
  console.log(`Hello ${i}`)
  i++
}*/

var a = Number(prompt("Enter Last Term Range of Fibonacci  Series : "))
var a = 0
var b = 1 
var sum = 1 
var sum = a+b
document.write(`${a} ${b}`)
while(sum <= num){
  document.write(`${sum}`)
  a = b
  b = sum
  sum = a + b
}