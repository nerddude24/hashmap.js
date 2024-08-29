import { HashMap } from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.entries());

console.log("---------------------------");

test.remove("dog");
test.remove("apple");

console.log(test.has("dog")); // false
console.log(test.has("kite")); // true

console.log(test.length()); // 10
console.log(test.get("lion")); // golden
console.log(test.get("dog")); // null

test.set("shotgun", "fire");
test.clear();

console.log(test.entries());
