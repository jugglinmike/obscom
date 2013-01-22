var nouns = ["moment", "feeling"];
// TODO: "(when|where)"
var obsRegex = new RegExp("that .*(" + nouns.join("|") + ") when([^\.\?!]*)", "gi");

function clean(text) {
	return text
		// Remove trailing punctuation
		.replace(/[\?\.!]*$/, "")
		.trim();
}

// Remove any preamble to the original observation along with any extraneous
// descriptive text.
function normalize(tweet) {
	return tweet.replace(obsRegex, function(_, noun, observation) {
		return "that " + noun + " when" + observation;
	});
}

function seinfeldify(origText) {
	return "What's the deal with " + origText + "?";
}

function findOberservations(text) {
	var observations = [];
	text.replace(obsRegex, function() {
		observations.push(arguments[0]);
	});
	return observations;
}

function makeObservations(input) {
	var observations = findOberservations(input);

	return observations
		.map(normalize)
		.map(clean)
		.map(seinfeldify);
}

module.exports = makeObservations;
