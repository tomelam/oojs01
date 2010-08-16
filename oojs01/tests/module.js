// Copyright 2010 Tom Elam


dojo.provide("oojs01.tests.module");

try{
    dojo.require("oojs01.tests.type");
    dojo.require("oojs01.tests.mutable");
    dojo.require("oojs01.tests.json");
    dojo.require("oojs01.tests.primitives");
    dojo.require("oojs01.tests.equality");
    dojo.require("oojs01.tests.arrays");
    dojo.require("oojs01.tests.oo");
    dojo.require("oojs01.tests.michaux-oop");
}catch(e){
    doh.debug(e);
}
