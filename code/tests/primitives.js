// Copyright 2010 Tom Elam

dojo.provide("code.tests.primitives");


// Explore primitive types (number, string, boolean) and types
// 'object', 'array', and 'function'.

// Explore strings, which fit neatly into neither the primitive type
// category or the reference type category.

// Explore literals and references.

// Values are typed, not variables, and a value can have only one
// type, i.e. only one result of applying the typeof operator to it.

// As _JavaScript: The Definitive Guide_ explains in section 3.15.2,
// there is no way to test whether a value of type 'string' is copied
// and passed by reference or by value. A value of type 'string' is
// immutable and there is no way to test that because there is no way
// to set just part of a 'string' value. Trying to set the whole thing
// creates a new 'string' value rather than modify data in place.

// Note that we refer to 'classes'. For a want of a better term, this
// is how we and other JavaScript programmers refer to Object, String,
// Number, and Boolean.

tests.register(
"code.tests.primitives",
[
{
    // Note that _JavaScript: The Definitive Guide_ says null is a
    // trivial type, but I do not agree with this, simply because the
    // value of the expression (typeof null) is 'object'. However,
    // null is a special value, as JS:TDG says. The object null is the
    // only object that cannot be assigned properties. 'null' in
    // JavaScript means approximately 'nonexistent'. It is useful as a
    // means to represent the 'nothing' result of a calculation that
    // could produce either something (perhaps a member of a class) or
    // 'nothing'. This 'nothing' value can be more useful than the
    // 'undefined' value because it can be explicitly returned from a
    // function. An 'undefined' value can be returned by a return
    // statement without a value, but the purpose of it is not be
    // explicit or obvious.

    name: "1. null is of type 'object' and has the same value as the 'undefined' value",
    runTest: function() {
	var set1 = null, data1;
	var setPropertyOfNullObject = function() {
	    var set2 = null;
	    set2.prop1 = "value x";
	}
	var setPropertyOfTheNull = function() {
	    var set2 = null;
	    set2.prop1 = "value x";
	}

	// What kind of thing is null?
	doh.assertTrue(typeof null == 'object');     // Crockford hates this!
	doh.assertFalse(typeof null == 'undefined'); // As we would expect.
	doh.assertFalse(null instanceof Object);     // 'object' but not Object!

	// Let's compare some values:
	doh.assertTrue(null == null);         // No surprise.
	doh.assertTrue(null == set1);         // No surprise.
	doh.assertTrue(null === null);        // There is only one null object.
	doh.assertTrue(null == data1);        // Equal to the 'undefined' value!

	// Is there some other syntax that represents the same thing as null?
	doh.assertFalse(null == {});          // Value comparison.
	doh.assertFalse(null == []);          // Value comparison.

	// What are some ways null is special?
	doh.assertError(TypeError, window, 'setPropertyOfNullObject', [],
			"Can't assign a property of a null object");
	doh.assertError(TypeError, window, 'setPropertyOfTheNull', [],
			"Can't assign a property of the null value");
    }
},
{
    name: "2. The primitive data type 'undefined' can have only one value, a special value",
    runTest: function() {
	var data1;
	var data2 = data1;
	var fun1 = function() {
	    console.debug("Return no value explicitly.");
	}
	var fun2 = function() {
	    console.debug("Again return no value explicitly.");
	}

	// What kind of thing is the 'undefined' value?
	doh.assertTrue(typeof data1 == 'undefined');
	doh.assertFalse(typeof data1 == 'object');

	// Can we assign the 'undefined' value to a variable?
	doh.assertTrue(typeof data2 == 'undefined');

	// Can we assign 'undefined' as the return value of a function?
	doh.assertTrue(typeof fun1() == 'undefined'); // Undefined return value.

	// Let's compare some values:
	doh.assertTrue(data1 == data2);     // 2 undefined values are equal.
	doh.assertFalse(data1 == 1);        // No surprise.
	doh.assertTrue(fun1() == fun2());   // No big surprise.

	// Let's see what kind of nothingness 'undefined' is:
	doh.assertFalse(data1 == 0);
	doh.assertFalse(data1 == '');
	doh.assertTrue(data1 == null);                // Equal to null!
	doh.assertFalse(typeof data1 == typeof null); // But has different type!
	doh.assertFalse(typeof data1 == 'object');    // And null is an object!
    }
},
{
    name: "3. A value of primitive type 'number' is not an instance of the class Number or the class Object",
    runTest: function() {
	// What kind of thing is a primitive number?
	doh.assertTrue("number" == typeof 1);
	doh.assertFalse("object" == typeof 1);
	doh.assertFalse(1 instanceof Number);
	doh.assertFalse(1 instanceof Object);

	// Let's compare some values:
	doh.assertTrue(2 == 2);      // Thank God we're sane.
	doh.assertTrue(3 === 3);     // Exactly equal, even though no reference!
    }
},
{
    name: "4. A value of primitive type 'number' is copied, passed, and compared by value, not by reference",
    runTest: function() {
	var number1 = 3;
	var number2 = 4;
	var number3 = 1, number4 = 1;

	var testHowNumberIsPassed = function(arg) {
	    doh.assertTrue(number1 === arg);          // Scope includes number1.
	    arg = 4;
	    doh.assertFalse(number1 === arg);         // Not passed by value.
	    doh.assertFalse(number1 == arg);          // Obviously now.
	}

	// Let's compare some values and references:
	doh.assertFalse(number1 === number2);         // Different references.
	number2 = number1;
	doh.assertTrue(number1 == number2);           // No surprise.
	doh.assertTrue(number1 === number2);          // Exactly equal!
	number2 = 5;
	doh.assertFalse(number1 == number2);          // Good.
	doh.assertFalse(number1 === number2);         // Different references.
	doh.assertTrue(number3 == number4);           // Separately assigned.
	doh.assertTrue(number3 === number4);          // Exactly equal!
	testHowNumberIsPassed(number1);
    }
},
{
    name: "5. Instances of the Number class *are* of type 'object'",
    runTest: function() {
	var number1 = new Number(3);
	var number2 = new Number(3);

	// What kind of a thing is an instance of the Number class?
	doh.assertTrue(typeof new Number(3) == 'object');
	doh.assertTrue(typeof new Number() == 'object'); // Even this works!

	// Let's compare some values:
	doh.assertFalse(new Number(3) == new Number(3)); // Can't compare refs!
	doh.assertFalse(number1 == number2);             // Not even this way.
	doh.assertFalse(new Number(4) === new Number(4));//Different references.
	doh.assertFalse(number1 === number2);            //Different references.
	doh.assertTrue(new Number() == 0);               // Default value.
	doh.assertTrue(3 == new Number(3));        // Autoconversion (unboxing).
	doh.assertTrue(new Number(3) == 3);        // Autoconversion (unboxing).
    }
},
{
    name: "6. Instances of the Number class must be converted before value comparison",
    runTest: function() {
	var number1 = new Number(1);
	var number2 = new Number(1);
	var number3 = number2;
	doh.assertFalse(number1 == number2); // 2 different objects!
	doh.assertTrue(number2 === number3); // 2 references to the same object.
	doh.assertTrue(number2 == number3);  // Only because it's one object!
	doh.assertTrue(number1.valueOf() ==
		       number2.valueOf());   // Compare primitives.
    }
},
{
    name: "7. A value of primitive type 'string' is not an instance of the class String or the class Object",
    runTest: function() {
	doh.assertTrue(typeof "Hello, string!" == "string");
	doh.assertFalse("Hello, string!" instanceof String);
	doh.assertFalse("Hello, string!" instanceof Object);
    }
},
{
    name: "8. A value of primitive type 'string' is compared by reference, not by value",
    runTest: function() {
	// Copied from _JavaScript: The Definitive Guide, 2nd Ed., p. 48.
	var s1 = "hello";
	var s2 = "hell" + "o";
	doh.assertTrue(s1 == s2);
    }
},
{
    name: "9. Object modification results in a new object",
    runTest: function() {
	// This test is modelled after an example in _Pro JavaScript
	// Techniques_, 2006, by John Resig.

	// Set item equal to a new string object
	var item = "test";
	// itemRef now refers to the same string object
	var itemRef = item;

	// Concatenate some new text onto the string object
	// NOTE: This creates a new object, and does not modify
	// the original object.
	item += "ing";
	// The values of item and itemRef are NOT equal, as a whole
	// new string object has been created
	doh.assertFalse(item == itemRef);
    }
},
{
    name: "10. Instances of the String class *are* of type 'object'",
    runTest: function() {
	doh.assertTrue("Hello, string object!" ==
		       new String("Hello, string object!"));
	doh.assertTrue(typeof new String("Hello, string object!") == "object");
	doh.assertTrue(typeof new String() == "object"); // Even this works!
	doh.assertTrue(new String() == "");
    }
},
{
    name: "11. Comparing references to strings is not the same as comparing those strings' values",
    runTest: function() {
	var string1 = new String("a string");
	var string2 = new String("a string");
	var string3 = string1;

	doh.assertFalse(string1 === string2); // Different objects.
	doh.assertTrue(string1 == string3); // The same object w/ 2 references.
	doh.assertTrue(string1 === string3);
    }
},
{
    name: "12. Instances of the String class must be converted before comparison",
    runTest: function() {
	var string1 = new String("a new string");
	var string2 = new String("a new string");

	doh.assertFalse(string1 == string2);
	doh.assertTrue(string1.toString() == string2.toString()); //Primitives.
    }
},
{
    name: "13. true & false are of type 'boolean' and are not instances of the class Boolean or the class Object",
    runTest: function() {
	// Explore true:
	doh.assertTrue(typeof true == "boolean");
	doh.assertFalse(true instanceof Boolean);
	doh.assertFalse(true instanceof Object);
	// Explore false:
	doh.assertTrue(typeof false == "boolean");
	doh.assertFalse(false instanceof Boolean);
	doh.assertFalse(false instanceof Object);
    }
},
{
    name: "14. Instances of the Boolean class *are* of type 'object'",
    runTest: function() {
	doh.assertTrue(new Boolean(true) == true);
	doh.assertTrue(typeof new Boolean(true) == "object");

	doh.assertTrue(new Boolean(false) == false);
	doh.assertTrue(typeof new Boolean(false) == "object");
	doh.assertTrue(new Boolean() == false);           // Default value.
	doh.assertTrue(typeof new Boolean() == "object"); // Even this works!
    }
},
{
    name: "15. Instances of the Boolean class must be converted before comparison",
    runTest: function() {
	var boolean1 = new String(true);
	var boolean2 = new String(true);
	doh.assertFalse(boolean1 == boolean2);
	doh.assertTrue(boolean1.valueOf() == boolean2.valueOf()); //Primitives.
    }
}
]);
