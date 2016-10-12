function Matrix() {
}
Matrix.PIDegree = Math.PI/180;
Matrix.prototype.a = 1;
Matrix.prototype.b = 0;
Matrix.prototype.c = 0;
Matrix.prototype.d = 1;
Matrix.prototype.e = 0;
Matrix.prototype.f = 0;
Matrix.prototype.reset = function() {
	this.a = 1;
	this.b = 0;
	this.c = 0;
	this.d = 1;
	this.e = 0;
	this.f = 0;
};
Matrix.prototype.translate = function(x, y) {
	this.multiply(1, 0, 0, 1, x, y);
};
Matrix.prototype.scaleNonUniform = function(x, y) {
	this.multiply(x, 0, 0, y, 0, 0);
};
Matrix.prototype.scaleX = function(s) {
	this.multiply(s, 0, 0, 1, 0, 0);
};
Matrix.prototype.scaleY = function(s) {
	this.multiply(1, 0, 0, s, 0, 0);
};
Matrix.prototype.rotate = function(a) {
	this.multiply(Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0);
};
Matrix.prototype.skewX = function(s) {
	this.multiply(1, 0, Math.tan(s*Matrix.PIDegree), 1, 0, 0);
};
Matrix.prototype.skewY = function(s) {
	this.multiply(1, Math.tan(s*Matrix.PIDegree), 0, 1, 0, 0);
};
Matrix.prototype.inverse = function() {
	var det = this.det();
	this.setTransformation(
		this.d/det,
		-this.b/det,
		-this.c/det,
		this.a/det,
		(this.c * this.f - this.d * this.e)/det,
		(this.b * this.e - this.a * this.f)/det
	);
};
Matrix.prototype.det = function() {
	return this.a * this.d - this.c * this.b;
};
// [a, c, e]   [a, c, e tx]   [aa+cb ac+cd ae+cf+e]
// [b, d, f] x [b, d, f ty] = [ba+db bc+dd be+df+f]
// [0, 0, 1]   [0, 0, 1]   [    0     0       1]
Matrix.prototype.setTransformation = function(a, b, c, d, e, f) {
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.e = e;
	this.f = f;
};
Matrix.prototype.multiply = function(a, b, c, d, e, f) {
	this.setTransformation(
		this.a * a + this.c * b,
		this.b * a + this.d * b,
		this.a * c + this.c * d,
		this.b * c + this.d * d,
		this.a * e + this.c * f + this.e,
		this.b * e + this.d * f + this.f
	);
};