/** @format */

//* ARRAY FILTER
const people = [
  { name: "Jack", hasPet: true, age: 12 },
  { name: "Jill", hasPet: false, age: 18 },
  { name: "Alice", hasPet: true, age: 22 },
  { name: "Bob", hasPet: false, age: 32 },
];

const peopleOfAge = people.filter((person) => person.age >= 18);

/*
Create your own filter function (so it can be reuse)
  Take in 2 parameters:
  1. The array you want to filter through
  2. A callback function
*/

function filterArr(arr, callback) {
  let resultArr = [];
  for (const person of arr) {
    const shouldBeIncluded = callback(person); //This will callback the function person.hasPet underneath
    if (shouldBeIncluded) resultArr.push(person);
  } // If true push results into a new array
  return resultArr;
}

const peopleWithPets = filterArr(people, function (person) {
  return person.hasPet;
}); // Return if hasPet is true

//* METHOD CHAINING
const voters = [
  { name: "Joe", email: "joe@joe.com", voted: true },
  { name: "Jane", email: "jane@jane.com", voted: true },
  { name: "Bo", email: "bo@bo.com", voted: false },
  { name: "Bane", email: "bane@bane.com", voted: false },
];

const hasVoted = voters
  .filter((person) => person.voted)
  .map((person) => person.email);

console.log(hasVoted);
