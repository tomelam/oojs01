// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.prototypal");


// Tests to show the basic characteristics of JavaScript's prototypal
// inheritance. JavaScript does not provide syntax for classical,
// class-based, inheritance. Instead, it provides syntax only for
// prototypal inheritance. Prototypal inheritance was developed for
// the Self language, and is not used in any mainstream language
// besides JavaScript.

// Some of the tests here are modelled after examples from Crockford's
// book _JavaScript: The Good Parts_. Here is a quote from that book:
//
//   "JavaScript is conflicted about its prototypal nature. Its
//   prototype mechanism is obscured by some complicated syntactic
//   business that looks vaguely classical. Instead of having objects
//   inherit directly from other objects, an unnecessary level of
//   indirection is inserted such that objects are produced by
//   constructor functions."
//
// Here is what "having objects inherit directly from other objects"
// might have looked like if JavaScript were not designed to use
// constructor functions, and if 'clone' were used as a JavaScript
// keyword to create an object inheriting from another object:
//
//   balu = clone anand;
//   cathy = clone balu;
//   dananjay = clone cathy;
//
// New objects could be modified after being created:
//
//   balu.firstName = "Bill";
//   balu.lastName = "B.S.";
//   cathy.firstName = "Cathy";
//   cathy.lastName = "Carter";
//   dananjay.firstName = "Dananjay";
//   dananjay.lastName = "D.G.";

// To show how prototypal inheritance works in JavaScript, and yet to
// hide the irrelevant detail Crockford refers to -- the call to the
// constructor function -- our tests use his Object.create function,
// described at http://javascript.crockford.com/prototypal.html .


tests.register(
"code.tests.prototypal",
[
{
    name: "1. Objects can inherit from objects using prototypal inheritance",
    setUp: function() {
	// Here we implement Crockford's Object.create method. It
	// accepts an object as an argument and returns a new object
	// using the passed-in object as a prototype.
	if (typeof Object.create !== 'function') {
	    Object.create = {}; // Necessary to make the following work.
	    Object.create = function(o) {// Earlier Crockford called it 'beget'
		// This create function should not be used to create
		// arrays, because such created arrays would not have
		// the special 'length' property.
		function F() {}
		F.prototype = o;
		return new F();
	    };
	};
    },
    runTest: function() {
	alan = {
	    firstName: "Alan",
	    lastName: "Kay",
	    languages: [ 'English', 'French', 'Smalltalk' ]
	};

	// Nowhere else to go but Object to find a constructor for comparison.
	doh.assertTrue(alan instanceof Object);

	// Now we have a constructor to compare against objects.
	bill = Object.create(alan);
	doh.assertTrue(bill instanceof alan.constructor);
	doh.assertTrue(bill.constructor === alan.constructor);

	// The constructors of alan and bill are identical. Are their names?
	doh.assertEqual(alan.firstName, bill.firstName);
	bill.firstName = "Bill";
	bill.lastName = "Brown";
	doh.assertNotEqual(alan.firstName, bill.firstName);

	// Are alan's and bill's constructors still identical?
	doh.assertTrue(bill instanceof alan.constructor);
	doh.assertTrue(bill.constructor === alan.constructor);

	// Produce a chain of 3 objects. What is shared and what is not?
	cathy = Object.create(bill);
	// The cathy object takes its name properties from bill, not alan!
	doh.assertEqual(cathy.firstName, bill.firstName);
	cathy.firstName = "Cathy";
	cathy.lastName = "Jones";
	cathy.languages = [ 'English', 'Spanish' ];
	doh.assertNotEqual(cathy.firstName, bill.firstName);

	// The constructors of all 3 objects are identical.
	doh.assertTrue(cathy instanceof bill.constructor);
	doh.assertTrue(cathy.constructor === bill.constructor);
	doh.assertTrue(cathy instanceof alan.constructor);
	doh.assertTrue(cathy.constructor === alan.constructor);
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

	// Deleting bill.firstName reveals the property value
	// inherited from bill's prototype. This shows that the
	// original property value was overridden, not replaced.
	delete bill.firstName;
	doh.assertEqual(alan.firstName, bill.firstName);

	// Deleting cathy.lastName and bill.lastName reveals the
	// property value inherited from cathy's prototype's prototype.
	delete cathy.lastName;
	delete bill.lastName;
	doh.assertEqual(alan.lastName, cathy.lastName);
    }
},
{
    name: "3. A property added to a prototype will immediately be visible in all the objects based on that prototype",
    runTest: function() {
	alan.company = "Wipro"
	doh.assertEqual(alan.company, bill.company);
	doh.assertEqual(alan.company, cathy.company);
    }
},
{
    name: "4. Use the hasOwnProperty method to check whether an object has a particular property",
    runTest: function() {
	doh.assertTrue(alan.hasOwnProperty('firstName'));
	doh.assertFalse(bill.hasOwnProperty('languages'));
	doh.assertEqual("undefined", typeof bill.junk);
	doh.assertFalse(bill.hasOwnProperty('junk'));
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
    name: "6. The constructor of an object can be changed on the fly to change the object's 'class'",
    runTest: function() {
	var o = {};
	doh.assertTrue(o instanceof Object);
	doh.assertEqual(Object, o.constructor);
	o.constructor = Date;
	doh.assertEqual(Date, o.constructor);
	console.group("o");
	console.dir(o);
	console.groupEnd();
	doh.assertEqual("undefined", typeof o.setYear);
	var d = new o.constructor();
	doh.assertEqual("function", typeof d.setYear);
	d.setYear(2010);
	doh.assertEqual(2010, d.getFullYear());
    }
},
{
    name: "7. A prototype can be changed on the fly to add/remove properties and methods to/from objects in the prototype chain",
    runTest: function() {
	var Foo = function() { this.bar = 4; };
	var foo1 = new Foo();
	doh.assertEqual(4, foo1.bar);
	doh.assertEqual("undefined", typeof foo1.baz);
	var foo2 = Object.create(foo1);
	doh.assertEqual(4, foo2.bar);
	doh.assertEqual("undefined", typeof foo2.baz);

	Foo.prototype = { baz: 3 };
	doh.assertEqual("undefined", typeof foo1.baz);
	doh.assertEqual("undefined", typeof foo2.baz);
	var foo3 = new Foo();
	doh.assertEqual(3, foo3.baz);
    }
},
{
    name: "8. Setting up one class to inherit from another is complicated (unless hidden in a function)",
    runTest: function() {
	// Create a 'class' with a useful constructor and a useful
	// prototype. Note that JavaScript doesn't have syntax
	// specifically for creating a class. (Every function object
	// in JavaScript can be used as a constructor, and inherited
	// parts must be added one by one to the prototype of the
	// class.)
	var Animal = function(name) {
	    this.name = name;
	};
	Animal.prototype.greet = function() {
	    return "Hi! My name is " + this.name;
	};
	anu = new Animal('Anu'); // Anu the amoeba.
	console.dir(anu);
	doh.assertEqual("Hi! My name is Anu", anu.greet());

	// Create some classes that inherit from the Animal
	// class. Each of these classes' constructors calls the
	// superclass's constructor in the scope of 'this'. As the
	// book _Pro JavaScript Design Patterns_ states, 'Setting up
	// one class to inherit from another takes multiple lines of
	// code (unlike the simple _extend_ keyword in most
	// object-oriented languages).'

	// Set up and test an Amphibian class, a subclass of Animal.
	var Amphibian = function(name, numLegs) {
	    Animal.call(this, name);
	    this.numLegs = numLegs;
	};
	Amphibian.prototype = new Animal();
	Amphibian.prototype.constructor = Animal;
	Amphibian.prototype.swim = function() { // Add a method to Author.
	    console.info('Swim, swim, swim!');
	};
	anand = new Amphibian('Anand', 4);
	console.dir(anand);
	doh.assertEqual("Hi! My name is Anand", anand.greet());
	anand.swim();

	// Set up and test a Mammal class, a subclass of Animal.
	var Mammal = function(init) {
	    Animal.call(this, name);
	    this.name = init.name; //Let it be undefined until and if specified.
	    this.numLegs = init.numLegs || 4;
	    this.numArms = init.numArms || 0;
	    this.laysEggs = init.laysEggs || false;
	    this.standsUpright = init.standsUpright || false;
	};
	Mammal.prototype = new Animal();
	Mammal.prototype.constructor = Animal;
	Mammal.prototype.breathe = function() { // Add a method to Author.
	    console.info('Breathe, breathe, breate!');
	};
	var manju = new Mammal({name:'Manju', numLegs:4,
				numArms:0, standsUpright:false});
	doh.assertEqual("Hi! My name is Manju", manju.greet());
	manju.breathe();

	var Arthropod = function(name, numSegments) {
	    Animal.call(this, name);
	    this.numSegments = numSegments;
	};
	Arthropod.prototype = new Animal();
	Arthropod.prototype.constructor = Animal;
	Arthropod.prototype.crawl = function() { // Add a method to Author.
	    console.info('Crawl, crawl, crawl!');
	};
	var arthur = new Arthropod('Arthur', 100);
	doh.assertEqual("Hi! My name is Arthur", arthur.greet());//From Animal.
	arthur.crawl(); // Not inherited from a superclass.

	// Set up and test an Ape class, a subclass of Mammal.
	var Ape = function(init) {
	    Mammal.call(this, name);
	    this.name = init.name; //Let it be undefined until and if specified.
	    this.numLegs = init.numLegs || 4;
	    this.numArms = init.numArms || 0;
	    this.laysEggs = init.laysEggs || false;
	    this.standsUpright = init.standsUpright || false;
	};
	Ape.prototype = new Mammal({});
	Ape.prototype.constructor = Mammal;
	var apu = new Ape({name:'Apu', numLegs:2,
			   numArms:2, standsUpright:true});
	doh.assertEqual("Hi! My name is Apu", apu.greet()); //greet from Animal.
	apu.breathe(); // breathe is inherited from Mammal.
    }
}
]);