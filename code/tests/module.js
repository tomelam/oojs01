// Copyright(c) 2010 Tom Elam
// Licensed under the terms of the GPL 3.0 license.

dojo.provide("code.tests.module");

try{
/*
    dojo.require("code.tests.new");
    dojo.require("code.tests.mutable");
    doh.registerUrl("code.tests.json",
		    dojo.moduleUrl("code", "tests/json.html"), 99999999);
    dojo.require("code.tests.primitives");
    dojo.require("code.tests.equality");
    dojo.require("code.tests.arrays");
    dojo.require("code.tests.message-passing");
    dojo.require("code.tests.scope");
    //dojo.require("code.tests.this");
    dojo.require("code.tests.prototypal");
    //dojo.require("code.tests.extjs");
    doh.registerUrl("code.tests.extjs",
		    dojo.moduleUrl("code", "tests/extjs.html"), 99999999);
    dojo.require("code.tests.patterns");
    dojo.require("code.tests.Object-prototype");
*/
    doh.registerUrl("code.tests.dom-in-edit-mode",
		    dojo.moduleUrl("code", "tests/dom-in-edit-mode"),
		    99999999);
/*
    //dojo.require("code.tests.protection"); // Not yet integrated.
    dojo.require("code.tests.michaux-oop");
    dojo.require("code.tests.unit-testing"); // Expect one error.
*/
}catch(e){
    doh.debug(e);
}
