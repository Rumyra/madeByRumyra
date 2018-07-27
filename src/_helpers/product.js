module.exports = function (favs, item) {
	if (favs > 50) {
		return item;
	} else {
		return false;
	}
}