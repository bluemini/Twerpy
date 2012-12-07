onload = function() {

	// login
	// login('nonsense', 'nonsense');

	// get the template item and insert it into the list
	var tweetList = document.getElementById("tweet-space-list");
	tweetList.appendChild(templateFill("tmp-tweet-item", {}));

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://twimg0-a.akamaihd.net/profile_images/1211293827/bluemini_normal.gif', true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
		var img = document.getElementById('test-image');
		img.src = window.webkitURL.createObjectURL(this.response);
	};
	// xhr.send();
};

tweet = function() {

	// 

}


login = function(consumerKey, consumerSecret) {
	var oauth = OAuth({
		consumerKey: consumerKey,
		consumerSecret: consumerSecret
	});

	oauth.post('https://api.twitter.com/oauth/access_token', {
			'x_auth_username': 'DarthVader',
			'x_auth_password': 'Luk3i5myS0n',
			'x_auth_mode': 'client_auth'
		}, successCallback, failureCallback);

	function successCallback(response) {
		// contain within is a token of joy
		var token = oauth.parseTokenRequest(response.text);

		var tokenKey = token.oauth_token;
		var tokenSecret = token.oauth_token_secret;

		oauth.setAccessToken(tokenKey, tokenSecret);

		// launch the rest of my application
		app.nowHasTokenCode();
	}

	function failureCallback(response) {
		console.error('Something bad happened', response.text);
	}
}


// template the provided id with the supplied data
function templateFill(tmp_id, data) {
	var tmpElem = document.getElementById(tmp_id);
	var tmpRoot = document.createElement("div");

	// use the template function to convert text to a function
	// var fn = template(tmpElem.innerHTML);

	// cleanse any whitespace (== text nodes) before the 'real' data
	var fn = template(tmpElem.innerHTML);
	tmpRoot.innerHTML = fn({'user-name':'Nick Harvey', 'user-handle':'@blewmini'}).replace(/^\s*/, '');
	return tmpRoot.firstChild;
}

// evaluate a string as a function
// borrowed HEAVILY from the underscore.js library
function template(text, data) {
	var matcher = new RegExp(/{:([\s\S]+?):}/g);
	var place = 0;
	var s = [];

	console.log("Attempting to resolve: " + text);

	text.replace(matcher, function(match, key, offset) {
		// add the bit up to the dynamic area..
		s.push({string:text.slice(place, offset)});
		// add the dynamic data
		s.push({dynamic:key});

		console.log("found: "+s);
		place = offset + match.length;
	})
	s.push({string:text.slice(place)});

	console.log("s: " + s);

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

	return render;
}


// function showVideo() {
// 	navigator.webkitGetUserMedia({video: true, audio: true}, function(localMediaStream) { 
// 		document.querySelector('video').src = webkitURL.createObjectURL(localMediaStream);
// 	}, function(error) {
// 		console.error('error');
// 	});	
// }