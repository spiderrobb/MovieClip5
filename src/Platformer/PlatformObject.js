PlatformObject.prototype = Object.create(MovieClip.prototype);
function PlatformObject(args) {
	MovieClip.call(this, args);
}
PlatformObject.prototype.top = function() {
	return this._y;
};
PlatformObject.prototype.bottom = function() {
	return this._y+this._height;
};
PlatformObject.prototype.left = function() {
	return this._x;
};
PlatformObject.prototype.right = function() {
	return this._x + this._width;
};
