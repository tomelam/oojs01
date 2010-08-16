// Copyright 2010 Tom Elam

dojo.provide("oojs01.tests.equality");


// Test our understanding of equality.

tests.register(
    "oojs01.tests.equality",
[
{
    name: "1. 3 == new Number(3) but 3 !=== new Number(3)",
    runTest: function() {
	doh.assertTrue(3 == (new Number(3)));
	doh.assertFalse(3 === (new Number(3)));
    }
},
{
    name: "2. 'Test string' == new String('Test string') but 'Test string' !=== new String('Test string')",
    runTest: function() {
	doh.assertTrue('Test string' == (new String('Test string')));
	doh.assertFalse('Test string' === (new String('Test string')));
    }
},
{
    name: "3. true == new Boolean(true) but true !=== new Boolean(true)",
    runTest: function() {
	doh.assertTrue(true == (new Boolean(true)));
	doh.assertFalse(true === (new Boolean(true)));
	doh.assertTrue(false == (new Boolean(false)));
	doh.assertFalse(false === (new Boolean(false)));
    }
}
]);
