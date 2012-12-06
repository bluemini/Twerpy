onload = function() {

	// login
	login('gyoudtpY1LqdomXIQ9BNJw', 'zCGBAc8b7xDe2gPKSexWh9cw26VT5O2ZWkdgPpwKM');

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
	xhr.send();
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
templateFill = function(tmp_id, data) {
	var tmpElem = document.getElementById(tmp_id);
	var tmpRoot = document.createElement("div");
	// cleanse any whitespace (== text nodes) before the 'real' data
	tmpRoot.innerHTML = tmpElem.innerHTML.replace(/^\s*/, '');
	return tmpRoot.firstChild;
}


	