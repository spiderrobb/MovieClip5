Player.prototype = Object.create(PlatformObject.prototype);
function Player(args) {
	args = args || {};
	// x vars
	this._xs = 0;
	this._xv = 0;
	this._xa = 2;
	this._xf = 0.8;
	this._xm = 10;

	// y vars
	this._ys = 0;
	this._yv = 0;
	this._ya = 2;
	this._yj = 25;
	this._ym = 25;
	
	// flags
	this._falling = true;
	PlatformObject.call(this, args);
}
Player.prototype.handleInput = function() {
	// handing moving left and right
	if (Key.isDown(Key.RIGHT)) {
		this._xv += this._xa;
	}
	if (Key.isDown(Key.LEFT)) {
		this._xv -= this._xa;
	}

	// check if jumping
	if (Key.justDown(Key.UP) && this._falling === false) {
		this._yv = -(this._yj+this._ya);
	}
};
Player.prototype.handleCollisions = function() {
	this._parent._platforms.forEach(function(platform) {
		window.platform = platform;
		if (platform._parent.player._ys+platform._parent.player._height <= platform.top() && 
			platform._parent.player.left() < platform.right() && 
			platform._parent.player.right() > platform.left() && 
			platform._parent.player.bottom() > platform.top()
		) {
			platform._parent.player._y       = platform.top()-platform._parent.player._height;
			platform._parent.player._yv      = 0;
			platform._parent.player._falling = false;
		} else if (platform._parent.player._ys >= platform.bottom() && 
			platform._parent.player.top() < platform.bottom() && 
			platform._parent.player.left() < platform.right() && 
			platform._parent.player.right() > platform.left()
		) {
			platform._parent.player._y  = platform.bottom();
			platform._parent.player._yv = 0;
		}
	});
	this._parent._platforms.forEach(function(platform) {
		if (platform._parent.player._xs+platform._parent.player._width <= platform.left() && 
			platform._parent.player.right() > platform.left() && 
			platform._parent.player.bottom() > platform.top() && 
			platform._parent.player.top() < platform.bottom() 
		) {
			platform._parent.player._x  = platform.left()-platform._parent.player._width;
			platform._parent.player._xv = 0;
		} else if (platform._parent.player._xs >= platform.right() && 
			platform._parent.player.left() < platform.right() && 
			platform._parent.player.top() < platform.bottom() && 
			platform._parent.player.bottom() > platform.top()
		) {
			platform._parent.player._x  = platform.right();
			platform._parent.player._xv = 0;
		}
	});

	// // hit checking for standing on ground
	if (this.bottom() >= this._parent.world.stage._height) {
		this._y       = this._parent.world.stage._height-this._height;
		this._falling = false;
		this._yv      = 0;
	}
};
Player.prototype.tickLogic = function() {
	// handle input
	this.handleInput();

	// always assume we are floating
	this._falling = true;
	// apply volocities
	this._xs = this._x;
	this._ys = this._y;
	this._x += this._xv;
	this._y += this._yv;


	// cliping max terminal velocities
	if (this._yv > this._ym) {
		this._yv = this._ym;
	} else if (this._yv < -this._ym) {
		this._yv = -this._ym;
	} 
	if (this._xv > this._xm) {
		this._xv = this._xm;
	} else if (this._xv < -this._xm) {
		this._xv = -this._xm;
	} 

	// hit checking for standing on ground
	this.handleCollisions();

	// apply gravity and friction
	this._xv *= this._xf;
	this._yv += this._ya;

	// handle parent
	PlatformObject.prototype.tickLogic.call(this);
};
