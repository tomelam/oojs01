// Copyright 2010 Tom Elam

dojo.provide("code.tests.type");


// The 'new' operator and syntactic sugar.

tests.register(
"code.tests.type",
[
{
    name: "1. An instance of the Object 'class' is created using the 'new' operator or syntactic sugar and inspected using 'typeof' and 'instanceof'",
    setUp: function() {
	simpleObject = new Object();
	simpleObject2 = {};
    },
    runTest: function() {
	doh.assertEqual("object", typeof simpleObject);
	doh.assertEqual("object", typeof simpleObject2);
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
	doh.assertEqual("object", typeof simpleArray);
	doh.assertEqual("object", typeof simpleArray2);
	doh.assertTrue(simpleArray instanceof Array);
	doh.assertTrue(simpleArray2 instanceof Array);
    }
}
]);
