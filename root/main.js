chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create("twerpy.html", {
		"width": 300,
		"minWidth": 300,
		"height": 500
	})
})