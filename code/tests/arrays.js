// Copyright 2010 Tom Elam

dojo.provide("code.tests.arrays");


// Explore the 'array' type.

tests.register(
"code.tests.arrays",
[
{
    name: "1. A number (a value of type 'number') does not have the type 'object' and is not an instance of the class Number or the class Object",
    runTest: function() {
	doh.assertEqual("number", typeof 1);
	doh.assertNotEqual("object", typeof 1);
	doh.assertFalse(1 instanceof Number);
	doh.assertFalse(1 instanceof Object);
    }
},
]);
