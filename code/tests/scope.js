// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.scope");


// Tests of how scope works. Tests 1 - 3 were modelled after examples
// in _Object-Oriented JavaScript_, Packt Publishing, 2008.

tests.register(
"code.tests.scope",
[
{
    name: "1. There is no block scope",
    runTest: function() {
	var var1 = 1;
	if (var1 == 1) {
	    var foo = 2;
	} else {
	    var bar = 3;
	};

	doh.assertEqual("number", typeof foo);
	doh.assertEqual("undefined", typeof bar);
	var1 = 0;
	if (var1 == 1) {
	    var foo = 2;
	} else {
	    var bar = 3;
	};
	doh.assertEqual("number", typeof bar);

	switch(bar) {
	case 3:
	    var bird = 4;
	    break;
	default:
	    break;
	};
	doh.assertEqual(typeof bird, "number");

	while (bar) {
	    var gecko;  // Executed every time through the loop!
	    console.debug(typeof gecko);
	    if (typeof gecko != "undefined") {
		doh.asserEqual(0, gecko);
	    };
	    bar--;
	};
    }
},
{
    name: "2. Declarations ride to the top of a function, but initializations don't",
    runTest: function() {
	// See pp. 71 - 72, _Object-Oriented JavaScript_, Packt.

	var a = 123;
	function f() {
	    doh.assertEqual("undefined", typeof a);
	    var a = 1;
	    doh.assertEqual(1, a);
	};
	f();
    }
},
{
    name: "3. A function creates a scope",
    runTest: function() {
	// See p. 80, _Object-Oriented JavaScript_, Packt.
	var a = 1;
	function f(){
	    var b = 1;
	    return a;
	};
	doh.assertEqual(f(), 1);
	doh.assertEqual(typeof b, "undefined");
    }
},
{
    name: "4. Function scope can be nested",
    runTest: function() {
	// See p. 81, _Object-Oriented JavaScript_, Packt.
	var a = 1;
	console.debug("In runTest");
	doh.assertEqual(typeof b, "undefined");
	doh.assertEqual(typeof c, "undefined");
	function f() {
	    var b = 1;
	    function n() {
		var c = 3;
		console.debug("In function n");
		doh.assertEqual(typeof a, "number");
		doh.assertEqual(typeof b, "number");
		doh.assertEqual(typeof c, "number");
	    };
	    console.debug("In function f");
	    doh.assertEqual(typeof a, "number");
	    doh.assertEqual(typeof c, "undefined");
	    n();
	}
	f();
    }
},
{
    name: "5. Functions have lexical scope",
    runTest: function() {
	// See pp. 81 - 81, _Object-Oriented JavaScript_, Packt.

	// Note: we have to use a function literal to put f1 into the
	// global scope so that doh.assertError will work and we have
	// to use a function literal to put f2 into the global scope
	// so that 'typeof f2' will be 'undefined'.

	// In JavaScript, functions have lexical scope. This means
	// that functions create their environment (scope) when they
	// are defined, not when they are executed. Let's see an
	// example:
	var error = 0;
	f1 = function() {
	    var a = 1;
	    return f2();
	};
	f2 = function() {
	    console.debug("typeof a: " + typeof a);
	    return a;
	};
	//f1();

	// doh.assertError might not work in Internet Explorer.
	//doh.assertError(ReferenceError, window, "f1", [], "a is undefined");
	try {
	    f1();
	} catch(e) {
	    error += 1;
	};
	doh.assertEqual(1, error);
	a = 5;   // Same as 'var window.a = 5'. Has to be global for f2().
	doh.assertEqual(f1(), 5);
	a = 55;
	doh.assertEqual(f1(), 55);

	delete a;
	//doh.assertError(ReferenceError, window, "f1", [], "a is undefined");
	try {
	    f1();
	} catch(e) {
	    error += 1;
	};
	doh.assertEqual(2, error);

	a = 5;
	delete f2;
	doh.assertTrue(typeof f2 == "undefined");
	try {
	    f1();
	    console.debug("We shouldn't get here!");
	    doh.assertTrue(false); // Make sure we find out if we're wrong.
	} catch(exception) {
	    console.debug("Error: " + exception);
	};

	f2 = function() {
	    return a * 2;
	};
	doh.assertEqual(f1(), 10);
    }
},
{
    name: "6. 'Breaking' the scope chain with a closure",
    runTest: function() {
	// See pp. 84 - 85, _Object-Oriented JavaScript_, Packt.

	function f() {
	    var b = "b";
	    return function() {
		return b;
	    };
	};
	doh.assertEqual(typeof b, "undefined");
	var n = f();
	doh.assertEqual(n(), "b");
    }
},
{
    name: "7. 'Breaking' the scope chain with a closure (a different way)",
    runTest: function() {
	// See p. 85, _Object-Oriented JavaScript_, Packt.

	var n;
	function f() {
	    var b = "b";
	    n = function() {
		return b;
	    };
	};
	doh.assertError(TypeError, window, "n", [], "Function not yet defined");
	f();
	doh.assertEqual(n(), "b");
    }
},
{
    name: "8. A function binds to its scope where defined, not where executed",
    runTest: function() {
	// See pp. 85 - 86, _Object-Oriented JavaScript_, Packt.

	function f(arg) {
	    var n = function() {
		return arg;
	    };
	    arg++;
	    return n;
	};
	var m = f(123);
	doh.assertEqual(m(), 124);
    }
}
]);