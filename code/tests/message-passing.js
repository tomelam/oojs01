// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.message-passing");


// Examples of message-passing style. The man who coined the term
// 'object oriented' meant message-passing, among other things. Most
// things that are now called 'object oriented' are not, according to
// him. In 2006 he said that, to him, 'object oriented' meant
// message-passing much more than objects and classes.

tests.register(
"code.tests.message-passing",
[
{
    name: "1. Lightweight Smalltalky object",
    runTest: function() {
	// An example of a way to create lightweight objects using the
	// message-passing style of programming. This is modelled
	// after an example in _Structure and Interpretation of
	// Computer Programs_.
	var cons = function(x, y) {
	    return function(m) {
		if (m == 0) {
		    return x;
		} else if (m == 1) {
		    return y;
		} else {
		    console.debug("** Error: Message not understood: " + m);
		    throw new TypeError(
			"Message not understood: " + m);
		};
	    };
	};
	var car = function(z) { return z(0); };
	var cdr = function(z) { return z(1); };
	var foo = cons(3, 4);

	console.group('foo');
	console.dir(foo);
	console.groupEnd();
	console.debug('typeof foo => ' + typeof foo + ', foo => ');
	console.debug(foo.toString());
	foo.printY = function() { console.debug('this => ' + this +
						', this.y => ' + this.y); }
	foo.printY();

	doh.assertEqual(3, foo(0), "a message works");
	doh.assertEqual(4, foo(1), "another message works");
	doh.assertEqual(3, car(foo), "a shortcut works");
	doh.assertEqual(4, cdr(foo), "the other shortcut works");
	passBadMessage = function() { // Let this be a method of window.
	    foo(2);
	}
	doh.assertError(TypeError, window, 'passBadMessage', [],
			"Try passing a bad message to foo");
    }
}
]);