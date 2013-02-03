# ObsCom
![Build Status](https://api.travis-ci.org/jugglinmike/obscom.png "Build Status")

A tiny utility to find the observational comedy hidden in blocks of text.

## Usage

In Node.js, simply require ObsCom and pass it a string. It will return any
observational comedy it can infer as an array of strings.

```javascript
var obscom = require("obscom");

var input = "Did you ever have that feeling " +
  "where you think someone's following you?");
var observations = obscom(input);

console.log(observations);
// [ "What's the deal with that feeling where you think someone's following you?" ]
```

Additionally, ObsCom can be invoked on the command line--it operates on text
from standard in:

    $ node obscom.js < the-matrix.txt
    ["What's the deal with that feeling where you don't know if you're awake or still dreaming?"]

## License

Copyright (c) 2012 Mike Pennisi Licensed under the MIT license.
