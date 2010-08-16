// Copyright 2010 Tom Elam

dojo.provide("code.tests.json");


// Explore JSON and object serialization.

tests.register(
"code.tests.json",
[
{
    name: "1. JSON is a subset of JavaScript -- just object literals",
    setUp: function() {
	var table = dojo.byId('testLayout');
	obj = {
            purpose: 'formatting',
            style: eval("dojo.attr(table, 'style')")
	};
	myJSONtext = JSON.stringify(obj);
    },
    runTest: function() {
	doh.assertEqual('formatting', obj.purpose);
	doh.assertEqual('margin: 0pt;', obj.style);
	dojo.require("code.json2");
	doh.assertEqual('{"purpose":"formatting","style":"margin: 0pt;"}',
			myJSONtext);
	var obj2;
	eval('obj2='+myJSONtext);
	doh.assertEqual(obj.purpose, obj2.purpose);
	doh.assertEqual(obj.style, obj2.style);
    }
},
{
    name: "2. Use JSON.parse(myJSONtext) for security",
    setUp: function() {
	dojo.require("code.json2");
	text = JSON.stringify({ type: 'command', subtype: 'move' });
	console.debug('text => ' + text);
    },
    runTest: function() {
	console.dir(JSON.parse(text));
	console.dir(JSON.parse('{ "type": "command", "subtype": "move" }'));
    }
}
]);
