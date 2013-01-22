var Twit = require("twit");
var request = require("request");

var nouns = ["moment", "feeling"];
var noun = nouns[Math.floor(Math.random() * nouns.length)];

function createUrl(noun) {

	var searchTerm = "that " + noun + " when";
	searchTerm = searchTerm.replace(/ /g, "+");

	return  "http://search.twitter.com/search.json?callback=?&rpp=100&q='" +
		searchTerm + "'&result_type=recent";
}

function parseResult(result) {
	return result.text;
}

function clean(text) {
	return text
		// Remove trailing punctuation
		.replace(/[\?\.!]*$/, "")
		.trim();
}

function makeRegex(noun) {
	return new RegExp("^.*that .*" + noun + ".* when", "i");
}

// Ensure that Twitter's fuzzy search hasn't returned a tweet that isn't
// actually observational comedy.
function isObservational(noun, tweet) {
	return makeRegex(noun).test(tweet);
}

// Remove any preamble to the original observation along with any extraneous
// descriptive text.
function normalize(noun, tweet) {
	var regex = makeRegex(noun);
	return tweet.replace(regex, "that " + noun + " when");
}

function seinfeldify(origText) {
	return "What's the deal with " + origText + "?";
}

function isValidTweet(tweet) {
	return tweet.length <= 140;
}

function processResponse(error, response, body) {
	var data, results;
	if (error) {
		console.error("HTTP Request failed.");
		process.exit(1);
	}
	try {
		data = JSON.parse(body);
	} catch(err) {
		console.error("Unable to parse response body as JSON");
		process.exit(1);
	}
	if (!("results" in data)) {
		console.error("Response JSON not formatted as expected.");
		process.exit(1);
	}
	return data.results;
}

function makeTweets(searchResults) {
	return searchResults
		.map(parseResult)
		.filter(isObservational.bind(null, noun))
		.map(normalize.bind(null, noun))
		.map(clean)
		.map(seinfeldify)
		// Filter out tweets that would be too long
		.filter(isValidTweet);
}

request(createUrl(noun), function() {
	var searchResults = processResponse.apply(null, arguments);
	var tweets = makeTweets(searchResults);

	console.log(tweets);
});
