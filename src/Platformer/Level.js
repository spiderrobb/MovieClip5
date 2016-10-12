Level.prototype = Object.create(MovieClip.prototype);
function Level(world, args) {
	args               = args || {};
	this._platforms    = [];
	this._portals      = [];
	this.player        = null;
	this.world         = world;
	this._scrollMargin = 200;
	MovieClip.call(this, args);
}
Level.prototype.addPlatform = function(p) {
	if (p instanceof Platform) {
		this._platforms.push(p);
		this.addChild(p);
	}
	return this;
};
Level.prototype.addPortal = function(p) {
	this._portals.push(p);
	this.addChild(p);
	return this;
};
Level.prototype.addPlayer = function(p) {
	if (p instanceof Player) {
		p._name     = 'player';
		this.player = p;
		this.addChild(p);
	}
	return this;
};
Level.prototype.adjustWindow = function() {
	if (this.player.left()+this._x < this._scrollMargin) {
		this._x = this._scrollMargin-this.player.left();
	} else if (this.player.right()+this._x > this.world.stage._width-this._scrollMargin) {
		this._x = (this.world.stage._width-this._scrollMargin) - this.player.right();
	}
};
Level.prototype.tickLogic = function() {
	this.adjustWindow();
	// handle parent
	MovieClip.prototype.tickLogic.call(this);
};