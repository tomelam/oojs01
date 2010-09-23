// Copyright 2010 Tom Elam

dojo.provide("code.tests.patterns");


// Tests modelled after the patterns described in _Pro JavaScript
// Design Patterns_, 2008, Apress.

tests.register(
"code.tests.patterns",
[
{
    name: "1. Object creation in Crockford's basic, simplified pattern",
    runTest: function() {
	// Here is a quote from _JavaScript: The Good Parts_:
	// "JavaScript is conflicted about its prototypal nature. Its
	// prototype mechanism is obscured by some complicated
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
	// of an operator keyword 'new', 'create', 'beget', 'clone',
	// or the like (from
	// http://javascript.crockford.com/prototypal.html):
	if (typeof Object.create !== 'function') {
	    Object.create = function (o) {// Earlier Crockford called it 'beget'
		// This create method should not be used to create
		// arrays, because such created arrays would not have
		// the special 'length' property.
		function F() {}
		F.prototype = o;
		return new F();
	    };
	};
	ram = {
	    firstName: "Ram",
	    lastName: "Mohan",
	    languages: [ 'Kannada', 'Hindi', 'English', 'JavaScript' ]
	};

	// Nowhere else to go but Object to find a constructor for comparison.
	doh.assertTrue(ram instanceof Object);

	// Now we have a constructor to compare against objects.
	jaya = Object.create(ram);
	doh.assertTrue(jaya instanceof ram.constructor);
	doh.assertTrue(jaya.constructor === ram.constructor);

	// The constructors of ram and jaya are identical. Are their names?
	doh.assertEqual(ram.firstName, jaya.firstName);
	jaya.firstName = "Jaya";
	jaya.lastName = "Kanappa";
	doh.assertNotEqual(ram.firstName, jaya.firstName);

	// Are ram's and jaya's constructors still identical?
	doh.assertTrue(jaya instanceof ram.constructor);
	doh.assertTrue(jaya.constructor === ram.constructor);

	// Produce a chain of 3 objects. What is shared and what is not?
	raju = Object.create(jaya);
	// The raju object takes its name properties from jaya, not ram!
	doh.assertEqual(raju.firstName, jaya.firstName);
	raju.firstName = "Raju";
	raju.lastName = "Das";
	raju.languages = [ 'Hindi' ];
	doh.assertNotEqual(raju.firstName, jaya.firstName);

	// The constructors of all 3 objects are identical.
	doh.assertTrue(raju instanceof jaya.constructor);
	doh.assertTrue(raju.constructor === jaya.constructor);
	doh.assertTrue(raju instanceof ram.constructor);
	doh.assertTrue(raju.constructor === ram.constructor);
    }
},
{
    name: "2. A clone's inherited properties can be overridden and the overriding can be reversed",
    runTest: function() {
	// Here is a quote from _JavaScript: The Good Parts_: "The
	// prototype link is used only in retrieval. If we try to
	// retrieve a property value from an object, and if the object
	// lacks the property name, then JavaScript attempts to
	// retrieve the property value from the prototype object. And
	// if that object is lacking the property, then it goes to its
	// prototype, and so on until the process finally bottoms out
	// with Object.prototype. If the desired property exists
	// nowhere in the prototype chain, then the result is the
	// undefined value. This is called delegation."

	// Deleting jaya.firstName reveals the property value
	// inherited from jaya's prototype. This shows that the
	// original property value was overridden, not replaced.
	delete jaya.firstName;
	doh.assertEqual(ram.firstName, jaya.firstName);

	// Deleting raju.lastName and jaya.lastName reveals the
	// property value inherited from raju's prototype's prototype.
	delete raju.lastName;
	delete jaya.lastName;
	doh.assertEqual(ram.lastName, raju.lastName);
    }
},
{
    name: "3. A property added to a prototype will immediately be visible in all the objects based on that prototype",
    runTest: function() {
	ram.company = "Wipro"
	doh.assertEqual(ram.company, raju.company);
    }
},
{
    name: "4. Use the hasOwnProperty method to check whether an object has a particular property",
    runTest: function() {
	doh.assertTrue(ram.hasOwnProperty('firstName'));
	doh.assertFalse(jaya.hasOwnProperty('languages'));
	doh.assertEqual("undefined", typeof jaya.junk);
	doh.assertFalse(jaya.hasOwnProperty('junk'));
    }
},
{
    name: "5. Properties given to an object by the constructor cannot be overridden -- only replaced",
    runTest: function() {
	var Foo = function() {
	    this.bar = 1;
	};
	var foo1 = new Foo();

	doh.assertEqual(1, foo1.bar);
	foo1.bar = 2;
	doh.assertEqual(2, foo1.bar);
	delete foo1.bar;
	doh.assertEqual("undefined", typeof foo1.bar);
    }
},
{
    name: "6. Changing the constructor of an object on the fly",
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