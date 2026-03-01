function plus(a, b) {
  return a + b;
}
let x = "x";
let y = "y";

let result1 = plus(x, y);
let result2 = plus(x, plus(x, y));

console.log(result1);
console.log(result2);

if (x === 5) {
  console.log("x is 5");
} else {
  console.log("x is not 5");
  console.log(plus("x is actually ", x));
}
