// Copyright 2010 Tom Elam

dojo.provide("code.tests.scope");


// Tests of how scope works. Tests 1 - 3 were modelled after examples
// in _Object-Oriented JavaScript_, Packt Publishing, 2008.

tests.register(
"code.tests.scope",
[
{
    name: "1. Declarations 'as if' ride to the top of a function, but initializations don't",
    runTest: function() {
	// Pp. 71 - 72, _Object-Oriented JavaScript_, Packt.
	
	var a = 123;
	function f() {
	    doh.assertEqual(typeof a, "undefined");
	    var a = 1;
	    doh.assertEqual(a, 1);
	}
	f();
    }
},
{
    name: "2. A function creates a scope",
    runTest: function() {
	// P. 80, _Object-Oriented JavaScript_, Packt.
	var a = 1;
	function f(){
	    var b = 1;
	    return a;
	}
	doh.assertEqual(f(), 1);
	doh.assertEqual(typeof b, "undefined");
    }
},
{
    name: "3. Function scope can be nested",
    runTest: function() {
	// P. 81, _Object-Oriented JavaScript_, Packt.
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
	    }
	    console.debug("In function f");
	    doh.assertEqual(typeof a, "number");
	    doh.assertEqual(typeof c, "undefined");
	    n();
	}
	f();
    }
},
{
    name: "4. Functions have lexical scope",
    runTest: function() {
	// Pp. 81 - 81, _Object-Oriented JavaScript_, Packt.

	// Note: we have to use a function literal to put f1 into the
	// global scope so that doh.assertError will work and we have
	// to use a function literal to put f2 into the global scope
	// so that 'typeof f2' will be 'undefined'.

	// In JavaScript, functions have lexical scope. This means
	// that functions create their environment (scope) when they
	// are defined, not when they are executed. Let's see an
	// example:
	f1 = function() {
	    var a = 1;
	    return f2();
	}
	f2 = function() {
	    console.debug("typeof a: " + typeof a);
	    return a;
	}
	//f1();

	doh.assertError(ReferenceError, window, "f1", [], "a is undefined");
	a = 5;   // Same as 'var window.a = 5'. Has to be global for f2().
	doh.assertEqual(f1(), 5);
	a = 55;
	doh.assertEqual(f1(), 55);

	delete a;
	doh.assertError(ReferenceError, window, "f1", [], "a is undefined");

	a = 5;
	delete f2;
	doh.assertTrue(typeof f2 == "undefined");
	try {
	    f1();
	    console.debug("We shouldn't get here!");
	    doh.assertTrue(false); // Make sure we find out if we're wrong.
	} catch(exception) {
	    console.debug("Error: " + exception);
	}

	f2 = function() {
	    return a * 2;
	}
	doh.assertEqual(f1(), 10);
    }
},
{
    name: "5. 'Breaking' the scope chain with a closure",
    runTest: function() {
	// Pp. 84 - 85, _Object-Oriented JavaScript_, Packt.

	function f() {
	    var b = "b";
	    return function() {
		return b;
	    }
	}
	doh.assertEqual(typeof b, "undefined");
	var n = f();
	doh.assertEqual(n(), "b");
    }
},
{
    name: "6. 'Breaking' the scope chain with a closure (a different way)",
    runTest: function() {
	// P. 85, _Object-Oriented JavaScript_, Packt.

	var n;
	function f() {
	    var b = "b";
	    n = function() {
		return b;
	    }
	}
	doh.assertError(TypeError, window, "n", [], "Function not yet defined");
	f();
	doh.assertEqual(n(), "b");
    }
},
{
    name: "7. A function binds to its scope where defined, not where executed",
    runTest: function() {
	// Pp. 85 - 86, _Object-Oriented JavaScript_, Packt.

	function f(arg) {
	    var n = function() {
		return arg;
	    }
	    arg++;
	    return n;
	}
	var m = f(123);
	doh.assertEqual(m(), 124);
    }
}
]);