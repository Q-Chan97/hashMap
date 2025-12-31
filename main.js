import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.capacity); // 16
console.log(test.length()); // 12

test.set('moon', 'silver')

console.log(test.capacity); // 32
console.log(test.length()); // 13

console.log(test.keys());

// test.set("apple", "red")
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.get("apple"); // Should return "red"
// test.has("apple"); // Should return true
// test.has("Sinatra"); // Should return false

// test.remove("carrot") // Test should only have apple and banana keys in it

// console.log(test.length()); // Should be 2

// test.set("dog", "brown");
// console.log(test.keys()); // Should be some order of "apple", "banana", "dog"
// console.log(test.values()); // Should be some order of "red", "yellow", "brown"
// console.log(test.entries()); // Should be some order of { key: 'apple', value: 'red' }, { key: 'banana', value: 'yellow' }, { key: 'dog', value: 'brown' }

// console.log(test);

// const newTest = new HashMap();
// newTest.set("To", "Delete");
// newTest.clear();
// console.log(newTest); // Should be empty hashmap