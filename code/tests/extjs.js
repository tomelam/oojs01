// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.extjs");


// Tests to show how Ext JS supports inheritance.


tests.register(
"code.tests.extjs",
[
{
    name: "1. Objects can inherit from objects using prototypal inheritance",
    setUp: function() {
	
    },
    runTest: function() {
	alan = {
	    firstName: "Alan",
	    lastName: "Kay",
	    languages: [ 'English', 'French', 'Smalltalk' ]
	};

	// Nowhere else to go but Object to find a constructor for comparison.
	doh.assertTrue(alan instanceof Object);

	// Now we have a constructor to compare against objects.
	bill = Object.create(alan);
	doh.assertTrue(bill instanceof alan.constructor);
	doh.assertTrue(bill.constructor === alan.constructor);

	// The constructors of alan and bill are identical. Are their names?
	doh.assertEqual(alan.firstName, bill.firstName);
	bill.firstName = "Bill";
	bill.lastName = "Brown";
	doh.assertNotEqual(alan.firstName, bill.firstName);

	// Are alan's and bill's constructors still identical?
	doh.assertTrue(bill instanceof alan.constructor);
	doh.assertTrue(bill.constructor === alan.constructor);

	// Produce a chain of 3 objects. What is shared and what is not?
	cathy = Object.create(bill);
	// The cathy object takes its name properties from bill, not alan!
	doh.assertEqual(cathy.firstName, bill.firstName);
	cathy.firstName = "Cathy";
	cathy.lastName = "Jones";
	cathy.languages = [ 'English', 'Spanish' ];
	doh.assertNotEqual(cathy.firstName, bill.firstName);

	// The constructors of all 3 objects are identical.
	doh.assertTrue(cathy instanceof bill.constructor);
	doh.assertTrue(cathy.constructor === bill.constructor);
	doh.assertTrue(cathy instanceof alan.constructor);
	doh.assertTrue(cathy.constructor === alan.constructor);
    }
}
]);