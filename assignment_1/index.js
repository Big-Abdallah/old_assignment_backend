let dash = '------------------------'
let slash = '////////////////////////'
console.log(" Hi Moaz , i hope you are doing well 💙💙 ")
// Part 1: Programming Questions
console.log(slash);

console.log(dash)
// Q1
// convert string to number by using Number() method
let convertToNumber = Number('123')
let newAddNumber = convertToNumber + 7
console.log('Q1 Answer:', newAddNumber)
// convert string to number by using parseInt() method
let convertToNumber2 = parseInt('123')
let newAddNumber2 = convertToNumber2 + 7
console.log('Q1 Answer:', newAddNumber2)
console.log(dash)
// Q2
// check if given variable is falsy and return "invalid" if it is
let variable = 0
if (!variable || Number.isNaN(variable)) {
    console.log('Q2 Answer: invalid')
}
console.log(dash)
// Q3
//Use for loop to print all numbers between 1 and 10, skipping even numbers using continue
for(let i = 1; i <= 10; i++) {
    if(i % 2 === 0) {
        continue
    }
    console.log('Q3 Answer:', i)
}
console.log(dash)
// Q4
// Create an array of numbers and return only the even numbers using filter method.
let numbers = [1, 2, 3, 4, 5]
let evenNumbers = numbers.filter(number => number % 2 === 0);
console.log('Q4 Answer:', evenNumbers)
console.log(dash)
// Q5
//Use the spread operator to merge two arrays, then return the merged array.
let array1 = [1, 2, 3]
let array2 = [4, 5, 6]
let mergedArray = [...array1, ...array2]
console.log('Q5 Answer:', mergedArray)
console.log(dash)
// Q6
//Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday).
let day = 1
switch (day) {
    case 1:
        console.log('Q6 Answer: Sunday')
        break
    case 2:
        console.log('Q6 Answer: Monday')
        break
    case 3:
        console.log('Q6 Answer: Tuesday')
        break
    case 4:
        console.log('Q6 Answer: Wednesday')
        break
    case 5:
        console.log('Q6 Answer: Thursday')
        break
    case 6:
        console.log('Q6 Answer: Friday')
        break
    case 7:
        console.log('Q6 Answer: Saturday')
        break
    default:
        console.log('Q6 Answer: Invalid day')
}
console.log(dash)
// Q7
//Create an array of strings and return their lengths using map method
let strings = ['a', 'ab', 'abc']
let lengths = strings.map(string => string.length)
console.log('Q7 Answer:', lengths)
console.log(dash)
// Q8
//Write a function that checks if a number is divisible by 3 and 5.
function isDivisibleBy3And5(number) {
    return (number % 3 === 0 && number % 5 === 0) ? "Divisible by both" : "Not divisible by both";
}
console.log('Q8 Answer:', isDivisibleBy3And5(15))
console.log(dash)
// Q9
//Write a function using arrow syntax to return the square of a number
const square = (number) => number * number
console.log('Q9 Answer:', square(5))
console.log(dash)
// Q10
//Write a function that destructures an object to extract values and returns a formatted string.
const person = {
    name: 'John',
    age: 30
}
function formatPerson({name, age}) {
    return `${name} is ${age} years old`
}
console.log('Q10 Answer:', formatPerson(person))
console.log(dash)
// Q11
//Write a function that accepts multiple parameters (two or more) and returns their sum.
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b , 0)
}
console.log('Q11 Answer:', sum(1, 2, 3, 4, 5))
console.log(dash)
//Q12
//Write a function that returns a promise which resolves after 3 seconds with a 'Success' message.
function successMessage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Success => this Delayed for 3 seconds')
        }, 3000)
    })
}
successMessage().then((message) => {
    console.log('Q12 Answer:', message)
})
console.log("Q12 Answer: Delayed for 3 seconds")
console.log(dash)
//Q13
//Write a function to find the largest number in an array. 
function findLargestNumber(array) {
    return Math.max(...array)
}
console.log('Q13 Answer:', findLargestNumber([1, 2, 3, 4, 5]))
console.log(dash)
// Q14
//Write a function that takes an object and returns an array containing only its keys.
function getKeys(object) {
    return Object.keys(object)
}
console.log('Q14 Answer:', getKeys({ name: 'John', age: 30 }))
console.log(dash)
// Q15
//Write a function that splits a string into an array of words based on spaces.
function splitString(string) {
    return string.split(' ')
}
console.log('Q15 Answer:', splitString('Hello World JavaScript , I am here'))
console.log(dash)


console.log(slash);
// Part 2: Essay Questions

// Q1
//What is the difference between forEach and for...of? When would you use each?
console.log('Q1 Answer: forEach is a method that iterates over an array, while for...of is a loop that iterates over an iterable object.')
console.log(dash)
//Q2
//What is hoisting and what is the Temporal Dead Zone (TDZ) ?
console.log('Q2 Answer: Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. The Temporal Dead Zone (TDZ) is the period between entering a scope and the declaration of a variable.')
console.log(dash)
//Q3
//What are the main differences between == and ===?
console.log('Q3 Answer: == is a comparison operator that checks for equality, while === is a strict equality operator that checks for equality and type.')
console.log(dash)
//Q4 
//Explain how try-catch works and why it is important in async operations.
console.log('Q4 Answer: try-catch is a mechanism that allows you to handle errors in your code. It is important in async operations because it allows you to handle errors that may occur during the execution of your code.')
console.log(dash)
//Q5
//What’s the difference between type conversion and coercion? Provide examples of each.
console.log('Q5 Answer: Type conversion is the process of converting a value from one type to another, while coercion is the automatic conversion of a value from one type to another.')
console.log(dash)

console.log(slash)


// Part 3 : Bonus Questions
function createCounter(init) {
    let currentValue = init;

    return {
        increment () {
            ++currentValue;
            return currentValue;
        },

        decrement () {
            --currentValue;
            return currentValue;
        },

        reset () {
            currentValue = init;
            return currentValue;
        }
    };
}
const counter = createCounter(10);

console.log("Bonus Answer:", counter.increment()); 
console.log("Bonus Answer:", counter.reset());     
console.log("Bonus Answer:", counter.decrement()); 
//
console.log(slash);
console.log("Thank you moaz for your time :) Have a nice day!");

