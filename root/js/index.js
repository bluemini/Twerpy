onload = function() {

	// login
	// login('nonsense', 'nonsense');

	refreshFeed([{'user-name':'Nick Harvey',
				'user-handle':'@blewmini',
				'tweet-text':'@whoeveryouare this is my test tweet that you should read...'
			},{'user-name':'Sean Corfield',
				'user-handle':'@seancorfield',
				'tweet-text':'RT @fuzie: Deadline for @cfobjective speaker submissions is Sunday. If you\'ve drafted a proposal, pull the trigger! #cfobjective'
			},{'user-name':'Kevin Lawler',
				'user-handle':'@kevinlawler',
				'tweet-text':'Thought experiment: if software had never been free of charge, would programmers be monetarily richer or poorer than other professions? Why?'
			}]);

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://twimg0-a.akamaihd.net/profile_images/1211293827/bluemini_normal.gif', true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
		var img = document.getElementById('test-image');
		img.src = window.webkitURL.createObjectURL(this.response);
	};
	// xhr.send();
};

/*
 * pass in the response from Twitter's API and render as new elements in the list
 */
function refreshFeed(tweetListData) {
	// get the template item and insert it into the list
	var tweetList = document.getElementById("tweet-space-list");
	for (var i=0; i<tweetListData.length;i++) {
		console.log("hello");
		tweetList.appendChild(tweetFill("tmp-tweet-item", tweetListData[i]));
	}
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
function tweetFill(tmp_id, data) {
	var tmpElem = document.getElementById(tmp_id);
	var tmpRoot = document.createElement("div");

	// cleanse any whitespace (== text nodes) before the 'real' data
	var fn = template(tmpElem.innerHTML);
	tmpRoot.innerHTML = fn(data).replace(/^\s*/, '');
	return tmpRoot.firstChild;
}



// function showVideo() {
// 	navigator.webkitGetUserMedia({video: true, audio: true}, function(localMediaStream) { 
// 		document.querySelector('video').src = webkitURL.createObjectURL(localMediaStream);
// 	}, function(error) {
// 		console.error('error');
// 	});	
// }