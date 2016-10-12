function Library() {
	this.assets = {};
}
Library.prototype.add = function(key, callable) {
	this.assets[key] = callable;
};
Library.prototype.get = function(key, args) {
	return this.assets[key](args);
};