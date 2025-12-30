import { HashMap } from "./hashmap.js";

const test = new HashMap();
test.set("apple", "red")
test.get("apple"); // Should return "red";

console.log(test);