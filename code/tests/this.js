// Copyright 2010 Tom Elam

dojo.provide("code.tests.this");


// Tests of how scope works. Tests 1 - 3 were modelled after examples
// in _Object-Oriented JavaScript_, Packt Publishing, 2008.

tests.register(
"code.tests.this",
[
{
    name: "1. The 'this' keyword is a reference to the current execution context",
    runTest: function() {
	function getContext() {
	    doh.assertEqual(this, window);
	}
	getContext();
    }
},
