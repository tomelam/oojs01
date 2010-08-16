// Copyright 2010 Tom Elam

dojo.provide("oojs01.tests.michaux-oop");


tests.register(
"oojs01.tests.michaux-oop",
[
{
    name: "Peter Michaux's (michaux.ca) OO",
    setUp: function() {
	// makes base item
	makeHouseBlend = function() {
	    return {
		toString: function() {
		    return 'House Blend';
		},
		toDollars: function() {
		    return 0.89;
		}
	    };
	};
	
	// makes different base item
	makeEspresso = function() {
	    return {
		toString: function() {
		    return 'Espresso';
		},
		toDollars: function() {
		    return 1.99;
		}
	    };
	};
	
	// Decorate (actually modifies by wrapping certain properties)
	// a base item or a base item that has already been decorated.
	// Cream costs extra.
	decorateWithMilk = function(beverage) {
	    var originalToString = beverage.toString;
	    beverage.toString = function() {
		return originalToString() + ', Milk';
	    };
	    var originalToDollars = beverage.toDollars;
	    beverage.toDollars = function() {
		return originalToDollars() + 0.20;
	    };
	    return beverage;
	};
	
	// Decorate a beverage with a different condiment.
	// Sugar is free.
	decorateWithSugar = function(beverage) {
	    var originalToString = beverage.toString;
	    beverage.toString = function() {
		return originalToString() + ', Sugar';
	    };
	    return beverage;
	};
	
	// Watch the changes as my coffee is made in stages.
	// House blend with milk and sugar
	myCoffee = makeHouseBlend();
    },
    runTest: function() {
	doh.assertEqual('House Blend', myCoffee.toString());
	doh.assertEqual(0.89, myCoffee.toDollars());
	myCoffee = decorateWithMilk(myCoffee);
	doh.assertEqual('House Blend, Milk', myCoffee.toString());
	doh.assertEqual(1.09, myCoffee.toDollars());
	myCoffee = decorateWithSugar(myCoffee);
	doh.assertEqual('House Blend, Milk, Sugar', myCoffee.toString());
	doh.assertEqual(1.09, myCoffee.toDollars());
	
	// double milk espresso
	var yourCoffee = 
	    decorateWithMilk(decorateWithMilk(makeEspresso()));
	yourCoffee.toString(); // 'Espresso, Milk, Milk'
	yourCoffee.toDollars(); // 2.39
    }
}
]);
