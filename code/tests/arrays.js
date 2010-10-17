// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.arrays");


// Explore the 'array' type.

tests.register(
"code.tests.arrays",
[
{
    name: "1. Instances of the class Array are also instances of class Object and are of type 'object'",
    runTest: function() {
	array1 = new Array();
	doh.assertTrue(typeof array1 == "object");
	doh.assertTrue(array1 instanceof Array);
	doh.assertTrue(array1 instanceof Object);
    }
}
]);
