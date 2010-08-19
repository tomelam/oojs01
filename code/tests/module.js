// Copyright 2010 Tom Elam

dojo.provide("code.tests.module");

try{
    dojo.require("code.tests.new");
    dojo.require("code.tests.mutable");
    dojo.require("code.tests.json");
    dojo.require("code.tests.primitives");
    dojo.require("code.tests.equality");
    dojo.require("code.tests.arrays");
    dojo.require("code.tests.oo");
    dojo.require("code.tests.michaux-oop");
}catch(e){
    doh.debug(e);
}
