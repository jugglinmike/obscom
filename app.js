var Twit = require("twit");
var request = require("request");
var seinbot = require("./seinbot");

var noun = "moment";

function createUrl(noun) {

	var searchTerm = "that " + noun + " when";
	searchTerm = searchTerm.replace(/ /g, "+");

	return  "http://search.twitter.com/search.json?callback=?&rpp=100&q='" +
		searchTerm + "'&result_type=recent";
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

function isValidTweet(tweet) {
	return tweet.length <= 140;
}

function parseResult(result) {
	return result.text;
}

request(createUrl(noun), function() {
	var searchResults = processResponse.apply(null, arguments);
	var tweets = searchResults.map(parseResult)
		.map(seinbot)
		.filter(function(results) {
			return results.length;
		});

	console.log(searchResults, tweets);
});
