module.exports = {
	jsonToQueryString: function (json) {
		return '?' +
			Object.keys(json).map(function (key) {
				return encodeURIComponent(key) + '=' +
					encodeURIComponent(json[key]);
			}).join('&');
	}
}