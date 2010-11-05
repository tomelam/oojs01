// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.Object-prototype");


// Tests to model a default system of invoking methods on Objects and
// Nodes by augmenting various objects.

tests.register(
"code.tests.Object-prototype",
[
{
    name: "1. The Object class can be augmented with a method",
    setUp: function() {
	Object.prototype.hi = function() { return "Hi!"; };
    },
    runTest: function() {
	var foo = {};
	doh.assertNotEqual("undefined", typeof foo.hi);
	doh.assertEqual("Hi!", foo.hi());
    }
},
{
    name: "2. The Object class is the ancestor of the Node class (this fails in Internet Explorer)",
    setUp: function() {
	bar = document.body;
	console.dir(bar);
    },
    runTest: function() {
	doh.assertNotEqual("undefined", typeof bar.hi);
    }
},
{
    name: "3. A common method can be defined in all Nodes via the prototype chain (this fails in Internet Explorer)",
    runTest: function() {
	doh.assertEqual("Hi!", bar.hi());
    }
},
{
    name: "4. An individual Node can be augmented",
    setUp: function() {
	bar.bye = function() { return "Bye!"; };
    },
    runTest: function() {
	doh.assertEqual("Bye!", bar.bye());
    }
}
]);