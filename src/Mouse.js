var Mouse = {
	event: {
		type: 'mouse',
		x: 0,
		y: 0,
		globalX:0,
		globalY:0,
		move: false,
		down: false,
		up: false
	},
	touch: {
		type: 'touch',
		list: [],
		start: false,
		move: false,
		end: false,
		cancel: false
	},
	register: function (obj) {
		// setting up listeners
		obj.addEventListener('mousemove', Mouse._onMouseMove);
		obj.addEventListener('mousedown', Mouse._onMouseDown);
		obj.addEventListener('mouseup', Mouse._onMouseUp);
		obj.addEventListener('touchstart', Mouse._onTouchStart);
		obj.addEventListener('touchmove', Mouse._onTouchMove);
		obj.addEventListener('touchend', Mouse._onTouchEnd);
		obj.addEventListener('touchcancel', Mouse._onTouchCancel);
	},
	clear: function() {
		this.event.move   = false;
		this.event.down   = false;
		this.event.up     = false;
		this.touch.start  = false;
		this.touch.move   = false;
		this.touch.end    = false;
		this.touch.cancel = false;
		this.touch.list   = [];
	},
	updateMouse: function(e) {
		this.event.x       = e.offsetX;
		this.event.y       = e.offsetY;
		this.event.globalX = e.offsetX;
		this.event.globalY = e.offsetY;
	},
	updateTouch: function(e) {
		//this.touch.list = e.
	},
	_onMouseMove: function(e) {
		Mouse.updateMouse(e);
		Mouse.event.move = true;
	},
	_onMouseDown: function(e) {
		Mouse.updateMouse(e);
		Mouse.event.down = true;
	},
	_onMouseUp: function(e) {
		Mouse.updateMouse(e);
		Mouse.event.up = true;
	},
	_onTouchStart: function(e) {
		Mouse.update(e);
		Mouse.touch.start = true;
	},
	_onTouchMove: function(e) {
		Mouse.update(e);
		Mouse.touch.move = true;
	},
	_onTouchEnd: function(e) {
		Mouse.update(e);
		Mouse.touch.end = true;
	},
	_onTouchCancel: function(e) {
		Mouse.update(e);
		Mouse.touch.cancel = true;
	}
};
