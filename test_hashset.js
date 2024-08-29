import HashSet from "./hashset.js";

const test = new HashSet();

test.add("red");
test.add("yellow");
test.add("orange");
test.add("brown");
test.add("gray");
test.add("green");
test.add("purple");
test.add("black");
test.add("white");
test.add("blue");
test.add("pink");
test.add("golden");

console.log(test.entries());

console.log("---------------------------");

test.remove("gray");
console.log(test.has("gray")); // false
console.log(test.has("golden")); // true

console.log(test.length()); // 11
test.add("golden"); // nothing happens
console.log(test.length()); // 11

test.add("sky");
test.add("shotgun"); // now it should be at full capacity and therefore: expanded.

console.log(test.entries());
console.log(test.length()); // 13

test.clear();
console.log(test.entries());
