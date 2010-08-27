// Copyright 2010 Tom Elam

dojo.provide("code.tests.protection");


// Examples of how to implement protection criteria of OO.

tests.register(
"code.tests.protection",
[
{
    name:
    "OO Feature #2: Protection: the inability of the client of a type to " +
	"detect its implementation, first coding attempt",
    // Source: http://www.crockford.com/javascript/private.html
    // The intent of Crockford's example code is to show how to create
    // private members (not really to implement protection).
    setUp: function() {
	// 'Container' is defined via an anonymous function to work
	// inside DOH.
	Container = function(param) {
	    function dec() {
		if (secret > 0) {
		    secret -= 1;
		    return true;
		} else {
		    return false;
		}
	    }
	    this.member = param;
	    var secret = 3;
	    var that = this;
	    this.service = function () {
		if (dec()) {
		    return that.member;
		} else {
		    return null;
		}
	    };
	}
    },
    runTest: function() {
	var myContainer = new Container('abc');
	console.group('myContainer');
	console.dir(myContainer);
	console.groupEnd();
	console.debug('typeof myContainer => ' + typeof myContainer + ', myContainer => ');
	console.debug(myContainer.toString());
	myContainer.printSecret = function() { console.debug('this => ' + this + ', this.secret => ' + this.secret); }
	myContainer.printSecret();

	doh.assertEqual('abc', myContainer.member);
	doh.assertEqual('undefined', typeof myContainer.secret);
	doh.assertEqual('undefined', typeof myContainer.dec);
	doh.assertEqual('abc', myContainer.service());
	doh.assertEqual('abc', myContainer.service());
	doh.assertEqual('abc', myContainer.service());
	doh.assertEqual(null, myContainer.service());
    }
},
{
    name:
    "OO Feature #2: Protection: Crockford's code for private members, both " +
	"with and without the 'that' workaround to show why 'that' is " +
	"necessary",
    setUp: function() {
	// 'Container2' and 'Container3' are defined via anonymous
	// functions to work inside DOH.
	Container2 = function(param) {
	    function dec() {
		console.debug('this.secret => ' + this.secret);
		if (secret > 0) {
		    secret -= 1;
		    return true;
		} else {
		    return false;
		}
	    }
	    this.member = param;
	    var secret = 3;
	    //var that = this;
	    this.service = function () {
		if (dec()) {
		    alert(this.member);
		} else {
		    alert(null);
		}
	    };
	}
	Container3 = function(param) {
	    function dec() {
		console.debug('that.secret => ' + that.secret);
		if (secret > 0) {
		    secret -= 1;
		    return true;
		} else {
		    return false;
		}
	    }
	    this.member = param;
	    var secret = 3;
	    var that = this;
	    this.service = function () {
		if (dec()) {
		    alert(that.member);
		} else {
		    alert(null);
		}
	    };
	}
    },
    runTest: function() {
	var myContainer2 = new Container2('abc');
	doh.assertEqual('abc', myContainer2.member);
	doh.assertEqual('undefined', typeof myContainer2.secret);
	doh.assertEqual('undefined', typeof myContainer2.dec);
	var button = document.createElement('button');
	button.appendChild(document.createTextNode(
	    'Call service in myContainer2!'));
	dojo.attr(button, 'onclick', myContainer2.service);
	document.body.appendChild(button);

	var myContainer3 = new Container3('abc');
	doh.assertEqual('abc', myContainer3.member);
	doh.assertEqual('undefined', typeof myContainer3.secret);
	doh.assertEqual('undefined', typeof myContainer3.dec);
	var button2 = document.createElement('button');
	button2.appendChild(document.createTextNode(
	    'Call service in myContainer3!'));
	dojo.attr(button2, 'onclick', myContainer3.service);
	document.body.appendChild(button2);
    }
},
{
    name:
    "OO Feature #N: Ad hoc polymorphism - functions and data structures " +
	"with parameters that can take on values of many different types",
    setUp: function() {
	Component = function(param) {
	    element = param;
	    this.getElement = function() {
		return element;
	    }
	}
    },
    runTest: function() {
	highlightStatusArea = function() {
	    dojo.style('status', 'backgroundColor', 'yellow');
	}
	var myComponent = new Component(highlightStatusArea);
	doh.assertEqual('function', typeof myComponent.getElement());
	doh.assertEqual(highlightStatusArea, myComponent.getElement());
	var myComponent2 = new Component('This is just a string!');
	doh.assertEqual('string', typeof myComponent2.getElement());
	doh.assertEqual('This is just a string!', myComponent2.getElement());
    }
}
]);