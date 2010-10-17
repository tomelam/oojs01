// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.new");


// The 'new' operator and syntactic sugar.

tests.register(
"code.tests.new",
[
{
    name: "1. An instance of the Object 'class' is created using the 'new' operator or syntactic sugar and inspected using 'typeof' and 'instanceof'",
    setUp: function() {
	simpleObject = new Object();
	simpleObject2 = {};
    },
    runTest: function() {
	doh.assertTrue(typeof simpleObject == "object");
	doh.assertTrue(typeof simpleObject2 == "object");
	doh.assertTrue(simpleObject instanceof Object);
	doh.assertTrue(simpleObject2 instanceof Object);
    }
},
{
    name: "2. An instance of the Array 'class' is created using the 'new' operator or syntactic sugar and inspected using 'typeof' and 'instanceof'",
    setUp: function() {
	simpleArray = new Array();
	simpleArray2 = [];
    },
    runTest: function() {
	doh.assertTrue(typeof simpleArray == "object");
	doh.assertTrue(typeof simpleArray2 == "object");
	doh.assertTrue(simpleArray instanceof Array);
	doh.assertTrue(simpleArray2 instanceof Array);
    }
}
]);
