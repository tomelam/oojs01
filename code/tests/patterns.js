// Copyright 2010 Tom Elam

dojo.provide("code.tests.patterns");


// Tests modelled after the patterns described in _Pro JavaScript
// Design Patterns_, 2008, Apress.

tests.register(
"code.tests.patterns",
[
{
    name: "1. Object creation in the basic, simplified pattern",
    runTest: function() {
	// Here is a quote from _JavaScript: The Good Parts_:
	// "JavaScript is conflicted about its prototypal nature. Its
	// prototype mechnaism is obscured by some complicated
	// syntactic business that looks vaguely classical. Instead of
	// having objects inherit directly from other objects, an
	// unnecessary level of indirection is inserted such that
	// objects are produced by constructor functions."
	//
	// Here is what (I think) "having objects inherit directly
	// from other objects" might have looked like if JavaScript
	// were not designed to use constructor functions:
	//
	//   jaya = clone person; // Or 'jaya = new person;'
	//   jaya.firstName = "Jaya";
	//   jaya.lastName = "Kanappa";
	//   jaya.languages = [ 'Kannada', 'English', 'Hindi', 'Java' ];
	//
	// Here is the pattern implemented without the syntactic sugar
	// of the 'clone' or 'new' operator (from
	// http://javascript.crockford.com/prototypal.html):
	if (typeof Object.create !== 'function') {
	    Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	    };
	};
	var ram = {
	    firstName: "Ram",
	    lastName: "Mohan",
	    languages: [ 'Hindi', 'English', 'JavaScript' ]
	};
	var jaya = Object.create(ram);
	jaya.firstName = "Jaya";
	jaya.lastName = "Kanappa";
	jaya.languages = [ 'Kannada', 'English', 'Tamil', 'Java' ];
    }
},
{
    name: "2. Changing the constructor of an object on the fly",
    runTest: function() {
	var o = {};
	doh.assertTrue(o instanceof Object);
	doh.assertEqual(Object, o.constructor);
	o.constructor = Date;
	doh.assertEqual(Date, o.constructor);
	console.group("o");
	console.dir(o);
	console.groupEnd();
	//doh.assertEqual("function", typeof o.setYear);
	//o.setyear(2010);
	//doh.assertEqual(2010, o.getFullYear());
    }
}
]);