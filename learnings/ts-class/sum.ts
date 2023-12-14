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

type PersonInterface = {
  name: string;
  age: number;
}

function greet(person: PersonInterface){
  return "Hi Mr. " + person.name + " your age is " + person.age;
}

console.log(greet({
  name: "nilay",
  age: 21
}))

//////////////////////////////////////////////////////////////////