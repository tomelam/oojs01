// Copyright 2010 Tom Elam

dojo.provide("code.tests.this");


// Tests of how 'this' works. Most tests were modelled after examples
// in _JavaScript: The Good Parts_, 2008. Function invocation, a
// function can receive declared parameters, and it always receives
// two other parameters: 'this' and 'arguments'. A quote from that
// book is 'The this parameter is very important in object oriented
// programming, and its value is determined by the _invocation
// pattern_.'
// 

tests.register(
"code.tests.this",
[
{
    name: "1. The 'this' keyword in the method invocation pattern",
    runTest: function() {
	// If a function is invoked as a method of an object, 'this'
	// is bound to the object at invocation time. This binding at
	// invocation time is called 'very late binding'. Methods that
	// get their object context from 'this' are called 'public
	// methods'. Note that the example in _JS: TGP_ has an error
	// (a semicolon where a comma belongs).
	var myThingie = {
	    value: 0,
	    increment: function() {
		this.value++;
	    }
	};
	myThingie.increment();
	doh.assertEqual(1, myThingie.value);
    }
},
{
    name: "2. The 'this' keyword in the function invocation pattern",
    runTest: function() {
	// In the function invocation pattern, a function is invoked
	// that is not the property of an object. For inner objects,
	// there is a workaround for a mistake in the design of
	// JavaScript.
	//
	// Here is a quote from _JavaScript: The Good Parts_: "When a
	// function is invoked with this pattern, 'this' is bound to
	// the global object. This was a mistake in the design of the
	// language. Had the language been designed correctly, when
	// the inner function is invoked, 'this' would still be bound
	// to the 'this' variable of the outer function."
	myThingie2 = {};
	var printMessage = function() {
	    console.debug("In printMessage: this => " + this);
	    doh.assertTrue(this === window);
	    var helper = function() {
		console.debug("In helper: this => " + this);
		doh.assertTrue(this === window);
	    };
	    helper();      // 'this' always === window.
	};

	printMessage();

	myThingie2.printMessage = function() {
	    var that = this;          // The usual workaround: capture 'this'.
	    doh.assertTrue(this === myThingie2);
	    var helper = function() {
		doh.assertTrue(this === window);      // Not the value we want.
		doh.assertTrue(that === myThingie2);  // The value we want.
	    };
	    helper();
	};
	myThingie2.printMessage();
    }
},
{
    name: "3. The 'this' keyword in the constructor invocation pattern",
    runTest: function() {
	// If a function is invoked via the 'new' operator, a new
	// object will be created and 'this' will be bound to the new
	// object.  In this case, the function is used as a
	// constructor.  The 'prototype' property of the the
	// constructor can be used to provide properties, including
	// methods, usable by all instances of the 'class', i.e. all
	// objects created by the constructor. (Many people who have
	// written about JavaScript say JavaScript has no classes, and
	// that is true in the classical sense of the term.)
	Queue = function(priority) {
	    this.priority = priority;
	};

	Queue.prototype.getPriority = function() {
	    return this.priority;
	};
	Queue.prototype.unsharedVar = "abc";

	var q1 = new Queue(1);
	doh.assertEqual(1, q1.getPriority());

	doh.assertEqual("abc", q1.unsharedVar);
	q1.unsharedVar = "xyz";
	doh.assertEqual("xyz", q1.unsharedVar);

	var q2 = new Queue(2);
	doh.assertEqual("abc", q2.unsharedVar);
	doh.assertEqual("xyz", q1.unsharedVar); // Shadow property in prototype.

	q2.getPriority = function() {           // Monkey patch q2.
	    return "NOPRIORITY";
	};
	doh.assertEqual("NOPRIORITY", q2.getPriority());
	doh.assertEqual(1, q1.getPriority());

	var q3 = new Queue(3);
	doh.assertEqual(3, q3.getPriority());   // Not affected by monkey patch.
	doh.assertEqual(1, q1.getPriority());   // And old objects not affected.
    }
},
{
    name: "4. The 'this' keyword in the apply invocation pattern",
    runTest: function() {
	// The 'apply' method allows us to set the value of 'this'.
	var add = function(a1, a2, a3) {
	    var sum = a1 + a2 + a3;
	    return sum;
	};
	var array;
	
	doh.assertEqual(7, add(1, 2, 4));

	array = [2, 4, 8];
	doh.assertEqual(14, add.apply(null, array));

	// 'Trick' the getPriority method into thinking it is part of
	// the adhoc object.
	var adhoc = {
	    priority: 99
	};
	doh.assertEqual(99, Queue.prototype.getPriority.apply(adhoc));
    }
},
]);
