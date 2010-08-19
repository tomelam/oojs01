//Declare out the name of the test module to make dojo's module loader happy.
dojo.provide("code.tests.unit-testing");

doh.register("unit-testing", [
    function assertTrueTest(){
	console.debug("In assertTrueTest");
	doh.assertTrue(true);
	doh.assertTrue(1);
	doh.assertTrue(!false);
    },
    function mySimpleAsyncTest(doh){
	console.debug("In mySimpleAsyncTest");
	var deferred = new doh.Deferred();
	setTimeout(function() {
	    try{
		console.debug("In mySimpleAsyncTest, try clause");
		doh.assertTrue(true);
		deferred.callback(true);
	    } catch(e) {
		deferred.errback(e);
	    }
	}, 100);
	return deferred;
    },
    {
	name: "thingerTest",
	setUp: function(){
	    this.thingerToTest = new Thinger();
	    this.thingerToTest.doStuffToInit();
	},
	runTest: function(){
	    doh.assertEqual("blah", this.thingerToTest.blahProp);
	    doh.assertFalse(this.thingerToTest.falseProp);
	    // ...
	},
	tearDown: function(){
	}
    },
    // ...
    {
	name: "Async test",
	runTest: function() {
	    var deferred = new doh.Deferred();
	    setTimeout(function() {
		try{
		    doh.assertTrue(true);
		    deferred.callback(true);
		} catch(e) {
		    deferred.errback(e);
		}
	}, 1000);
	    return deferred;
	}
    }
]);