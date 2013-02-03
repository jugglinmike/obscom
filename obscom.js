var nouns = ["moment", "feeling"];
var obsRegex = new RegExp("that " +
		".*" +
			"(" + nouns.join("|") + ")\\s" +
		"(when|where)" +
		"((?:" +
			// Any non-punctuation, non-quote string
			"[^\.\?!\"']*|" +
			// Any double-quote wrapped string
			"\"[^\"]+\"|" +
			// Any single-quote wrapped string
			"'[^']+'|" +
			// Any non-punctuation string
			"[^\.\?!]" +
		"*)+)", "gi");

function clean(text) {
	return text
		// Remove trailing punctuation
		.replace(/[\?\.!]*$/, "")
		.trim();
}

// Remove any preamble to the original observation along with any extraneous
// descriptive text.
function normalize(tweet) {
	return tweet.replace(obsRegex, function(_, noun, conjunction, observation) {
		return "that " + noun + " " + conjunction + observation;
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
