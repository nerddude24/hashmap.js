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
console.log(test.get("dog")); // null
console.log(test.has("dog")); // false
console.log(test.has("kite")); // true

console.log(test.length()); // 11

console.log(test.get("lion")); // golden
test.set("lion", "king of the junjle");
console.log(test.get("lion")); // king of the junjle

test.set("shotgun", "fire");
test.clear();
