import { HashMap } from "./hashmap.js";

const test = new HashMap();
test.set("apple", "red")
test.set("banana", "yellow");
test.set("carrot", "orange");
test.get("apple"); // Should return "red"
test.has("apple"); // Should return true
test.has("Sinatra"); // Should return false

test.remove("carrot") // Test should only have apple and banana keys in it

console.log(test);