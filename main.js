import { HashMap } from "./hashmap.js";

const test = new HashMap();
test.set("apple", "red")
test.get("apple"); // Should return "red"
test.has("apple"); // Should return true
test.has("Sinatra"); // Should return false

console.log(test);