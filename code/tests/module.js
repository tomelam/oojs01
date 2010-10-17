// Copyright 2010 Tom Elam

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
    dojo.require("code.tests.this");
    dojo.require("code.tests.prototypal");
*/
    //dojo.require("code.tests.extjs");
    doh.registerUrl("code.tests.extjs",
		    dojo.moduleUrl("code", "tests/extjs.html"), 99999999);
/*
    dojo.require("code.tests.patterns");
    dojo.require("code.tests.protection");
    dojo.require("code.tests.michaux-oop");
    dojo.require("code.tests.unit-testing");
*/
}catch(e){
    doh.debug(e);
}
