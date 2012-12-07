(function() {
	
	// evaluate a string as a function
	// borrowed HEAVILY from the underscore.js library
	template = function(text, data) {
		var matcher = new RegExp(/{:([\s\S]+?):}/g);
		var place = 0;
		var s = [];

		console.log("Attempting to resolve: " + text);

		// build the data structure that holds the various 'parts' of the template string..
		text.replace(matcher, function(match, key, offset) {
			// add the bit up to the dynamic area..
			s.push({string:text.slice(place, offset)});
			// add the dynamic data
			s.push({dynamic:key});

			console.log("found: "+s);
			place = offset + match.length;
		})
		s.push({string:text.slice(place)});

		// build the function from the parsed data, awaiting a data object to render into it
		var render = function(data) {
			var o = '';
			var d = data || {};
			for (i=0; i<s.length; i++) {
				if (s[i].dynamic) {
					if (d[s[i].dynamic]) {
						o += d[s[i].dynamic];
					} else {
						console.error("Unknown dynamic argument: " + s[i].dynamic);
					}
				} else if (s[i].string) {
					o += s[i].string;
				}
			}
			console.log("Output: "+o);
			return o;
		}

		// return the render function, to be called later with the data
		return render;
	}


}).call(this);