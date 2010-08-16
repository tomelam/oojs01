// Copyright 2010 Tom Elam

dojo.provide("oojs01.tests.primitives");


// Explore primitive types (number, string, boolean) and types
// 'object', 'array', and 'function'.

// Explore strings, which fit neatly into neither the primitive type
// category or the reference type category.

// Explore literals and references.

// Note that we refer to 'classes'. For a want of a better term, this
// is how we and other JavaScript programmers refer to Object, String,
// Number, and Boolean.

tests.register(
"oojs01.tests.primitives",
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
{
    name: "2. Instances of the Number class *are* of type 'object'",
    runTest: function() {
	doh.assertEqual(3, new Number(3));
	doh.assertEqual("object", typeof new Number(3));
	doh.assertEqual("object", typeof new Number()); // Even this works!
	doh.assertEqual(0, new Number());
    }
},
{
    name: "3. A number (a value of type 'number') is copied, or passed, by reference, not by value",
    runTest: function() {
	doh.assertTrue();
    }
},
{
    name: "4. A number (a value of type 'number') is compared by reference, not by value",
    runTest: function() {
	doh.assertTrue();
    }
},
{
    name: "5. Instances of the Number class must be converted before value comparison",
    setUp: function() {
	number1 = new Number(1);
	number2 = new Number(1);
    },
    runTest: function() {
	doh.assertFalse(number1 == number2);
	doh.assertTrue(number1.valueOf() == number2.valueOf()); // Primitives.
    }
},
{
    name: "6. Comparing references to numbers is not the same as comparing the numbers' values",
    runTest: function() {
	var number3 = number1;
	doh.assertFalse(number1 === number2); // Different objects.
	doh.assertTrue(number1 == number3); // The same object w/ 2 references.
	doh.assertTrue(number1 === number3); // Copy by reference.
    }
},
{
    name: "7. A value of type 'string' does not have the type 'object' and is not an instance of the class String or the class Object",
    runTest: function() {
	doh.assertEqual("string", typeof "Hello, string!");
	doh.assertNotEqual("object", typeof "Hello, string!");
	doh.assertFalse("Hello, string!" instanceof String);
	doh.assertFalse("Hello, string!" instanceof Object);
    }
},
{
    name: "8. Instances of the String class *are* of type 'object'",
    runTest: function() {
	doh.assertEqual("Hello, string object!",
			new String("Hello, string object!"));
	doh.assertEqual("object", typeof new String("Hello, string object!"));
	doh.assertEqual("object", typeof new String()); // Even this works!
	doh.assertEqual("", new String());
    }
},
{
    name: "9. Is it true a string (a value of type 'string') is copied, or passed, by reference, not by value?",
    runTest: function() {
	console.debug("It's not possible to write a test to determine this! See JS:TDG 3.15.2.");
    }
},
{
    name: "10. A string (a value of type 'string') is compared by reference, not by value",
    runTest: function() {
	doh.assertTrue();
    }
},
{
    name: "11. Instances of the String class must be converted before comparison",
    setUp: function() {
	string1 = new String("a string");
	string2 = new String("a string");
    },
    runTest: function() {
	doh.assertFalse(string1 == string2);
	doh.assertTrue(string1.toString() == string2.toString()); //Primitives.
    }
},
{
    name: "12. Comparing references to strings is not the same as comparing those strings' values",
    runTest: function() {
	var string3 = string1;
	doh.assertFalse(string1 === string2); // Different objects.
	doh.assertTrue(string1 == string3); // The same object w/ 2 references.
	doh.assertTrue(string1 === string3);
    }
},
{
    name: "13. true and false do not have the type 'object' and are not instances of the class Boolean or the class Object",
    runTest: function() {
	// Explore true:
	doh.assertEqual("boolean", typeof true);
	doh.assertNotEqual("object", typeof true);
	doh.assertFalse(true instanceof Boolean);
	doh.assertFalse(true instanceof Object);
	// Explore false:
	doh.assertEqual("boolean", typeof false);
	doh.assertNotEqual("object", typeof false);
	doh.assertFalse(false instanceof Boolean);
	doh.assertFalse(false instanceof Object);
    }
},
{
    name: "14. Instances of the Boolean class *are* of type 'object'",
    runTest: function() {
	doh.assertEqual(true, new Boolean(true));
	doh.assertEqual("object", typeof new Boolean(true));
	doh.assertEqual("object", typeof new Boolean()); // Even this works!

	doh.assertEqual(false, new Boolean(false));
	doh.assertEqual("object", typeof new Boolean(false));
	doh.assertEqual("object", typeof new Boolean()); // Even this works!

	doh.assertEqual(false, new Boolean());
    }
},
{
    name: "15. Instances of the Boolean class must be converted before comparison",
    setUp: function() {
	boolean1 = new String(true);
	boolean2 = new String(true);
    },
    runTest: function() {
	doh.assertFalse(boolean1 == boolean2);
	doh.assertTrue(boolean1.valueOf() == boolean2.valueOf()); //Primitives.
    }
},
{
    name: "16. Strings are immutable",
    setUp: function() {
	string = "Original";
	tryToModifyString = function(s) {
	    s = "Changed!";
	    doh.assertEqual("Changed!", s);
	}
	tryToModifyString(string);
    },
    runTest: function() {
	doh.assertEqual("Original", string);
    }
}
]);
