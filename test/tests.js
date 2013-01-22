var seinbot = require("../seinbot");
var data = require("./data.json");

data.forEach(function(testData, idx) {

	exports["test" + idx] = function(test) {
		var actual = seinbot(testData.input);
		test.deepEqual(testData.expected, actual);
		test.done();
	};

});

