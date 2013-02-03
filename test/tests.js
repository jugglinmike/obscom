var obscom = require("../obscom");
var data = require("./data.json");

data.forEach(function(testData, idx) {

	exports["test" + idx] = function(test) {
		var actual = obscom(testData.input);
		test.deepEqual(testData.expected, actual);
		test.done();
	};

});

