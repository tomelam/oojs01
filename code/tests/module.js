// Copyright 2010 Tom Elam

dojo.provide("code.tests.module");

try{
    dojo.require("code.tests.new");
    dojo.require("code.tests.mutable");
    dojo.require("code.tests.json");
    dojo.require("code.tests.primitives");
    dojo.require("code.tests.equality");
    dojo.require("code.tests.arrays");
    dojo.require("code.tests.message-passing");
    dojo.require("code.tests.scope");
    dojo.require("code.tests.this");
    dojo.require("code.tests.protection");
    dojo.require("code.tests.michaux-oop");
    dojo.require("code.tests.unit-testing");
}catch(e){
    doh.debug(e);
}
