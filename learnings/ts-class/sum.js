"use strict";
// function calculateSum(a: number, b: number): number{
//   return a + b;
// }
// const x = calculateSum(1, 4);
// console.log(x);
//////////////////////////////////////////////////////////////////
// interface PersonInterface{
//   name: string;
//   age: number;
// }
// class Person implements PersonInterface{
//   name: string;
//   age: number;
//   constructor(name: string, age: number){
//     this.name = name;
//     this.age = age;
//   }
//   greet(){
//     return "hi Mr. " + this.name;
//   }
// }
// const personObject = new Person("nilay", 21)
// console.log(personObject.greet())
//////////////////////////////////////////////////////////////////
// type PersonInterface = {
//   name: string;
//   age: number;
// }
// function greet(person: PersonInterface){
//   return "Hi Mr. " + person.name + " your age is " + person.age;
// }
// console.log(greet({
//   name: "nilay",
//   age: 21
// }))
//////////////////////////////////////////////////////////////////
// type Input = (number | string)[];
// function getFirstNumber(arr: Input): (number | string){
//   return arr[2];
// }
// let a = getFirstNumber([3, 4, 2]);
// let b = getFirstNumber(["three", "four", "two"]);
// b.toLowerCase(); // gives error
// console.log(a);
// console.log(b);
// function getFirstNumber<T>(arr: T[]) { // introduced Generics
//   return arr[2];
// }
// let a = getFirstNumber([3, 4, 2]);
// let b = getFirstNumber(["three", "four", "two"]);
// b.toLowerCase(); //error solved
// console.log(a);
// console.log(b);
//////////////////////////////////////////////////////////////////
// Create a swap function that can takes two arguments of the same type
// Args can be either two strings, number or booleans (both of the same type)
// The function should swap them and return an array with first element as the second one and vice versa
// function swap<T>(a: T, b: T): [T, T]{
//   return [b, a];
// }
// let ans = swap("hi", "hello");
// let ans1 = swap(1, 2);
// console.log(ans);
function swap(a, b) {
    return [b, a];
}
let ans = swap("hi", 1);
let ans1 = swap(true, 2);
console.log(ans);
