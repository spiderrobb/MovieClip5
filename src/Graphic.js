function Graphic() {

}
Graphic.prototype.calls = [];
Graphic.prototype.render = function(ctx) {
	this.calls.forEach(function(action) {
		ctx[action[0]].apply(ctx, action[1]);
	});
}
Graphic.prototype.rectangle = function(x,y,width,height) {
	this.calls.push(['rect', [x,y,width,height]]);
}
Graphic.prototype.circle = function(x,y,r) {
	this.calls.push(['arc', [x, y, r, 0, 2 * Math.PI]]);
}
Graphic.prototype.text = function(text) {

}
Graphic.prototype.image = function(img, x1, y1, w1, h1, x2, y2, w2, h2) {
	if (typeof w1 === 'undefined') {
		this.calls.push(['drawImage', [x1, y1]]);
	} else if (typeof x2 === 'undefined') {
		this.calls.push(['drawImage', [x1, y1, w1, h1]]);
	} else {
		this.calls.push(['drawImage', [x2, y2, w2, h2, x1, y1, w1, h1]]);
	}
}