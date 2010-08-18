// Copyright 2010 Tom Elam

dojo.provide("code.tests.mutable");


// Test mutability of objects in JavaScript.

// Note that we refer to 'classes'. For a want of a better term, this
// is how we and other JavaScript programmers refer to Object and
// other constructors.

tests.register(
"code.tests.mutable",
[
{
    name: "1. Objects are mutable: a property can be added to an instance",
    setUp: function() {
	Person = function(firstName, lastName) {
	    this.firstName = firstName;
	    this.lastName = lastName;
	};
	guy = new Person('Sharukh', 'Khan');
	guy2 = new Person('Amitabh', 'Bachchan');
    },
    runTest: function() {
	console.debug('** Look into the Shahrukh Person object:');
	doh.assertEqual('undefined', typeof guy.age);
	for (prop in guy) {
	    console.debug(prop + ': ' + guy[prop] +
			  (guy.hasOwnProperty(prop)? ' mine' : ''));
	};
	console.debug('** Look into the Amitabh Person object:');
	doh.assertEqual('undefined', typeof guy2.age);
	for (prop in guy2) {
	    console.debug(prop + ': ' + guy2[prop] +
			  (guy2.hasOwnProperty(prop)? ' mine' : ''));
	};
	console.debug('** Mutate the Shahrukh object:');
	guy.age = 45;
	doh.assertEqual(45, guy.age);
	for (prop in guy) {
	    console.debug(prop + ': ' + guy[prop] +
			  (guy.hasOwnProperty(prop)? ' mine' : ''));
	};
    }
},
{
    name: "2. Mutating an object does not affect other objects of its class",
    setUp: function() {
	console.debug('** See whether all older objects are affected:');
    },
    runTest: function() {
	doh.assertEqual('undefined', typeof guy2.age);
	for (prop in guy2) {
	    console.debug(prop + ': ' + guy2[prop] +
			  (guy2.hasOwnProperty(prop)? ' mine' : ''));
	};
    }
},
{
    name: "3. Mutating an object does not even affect objects of its class made later",
    setUp: function() {
	console.debug('** See whether newer objects are affected:');
	gal = new Person('Aishwarya', 'Rai');
    },
    runTest: function() {
	doh.assertEqual('undefined', typeof gal.age);
	for (prop in gal) {
	    console.debug(prop + ': ' + gal[prop] +
			  (gal.hasOwnProperty(prop)? ' mine' : ''));
	};
    }
},
{
    name: "4. Can't assign a property of an undefined reference (i.e. variable)",
    setUp: function() {
	badProperty = function() { nn.a = 1; };
    },
    runTest: function() {
	doh.assertError(ReferenceError, window, 'badProperty', [],
			"Can't assign a property of an undefined variable");
	try {
	    oo.b = 2;
	} catch(exception) {
	    console.debug("** Caught exception: " + exception);
	}
    }
}
]);
