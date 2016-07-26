var Mouse = {
	event: {
		type: 'mouse',
		x: 0,
		y: 0,
		movementX: 0,
		movementY: 0
	},
	move: false,
	down: false,
	up: false,
	register: function (obj) {
		// setting up listeners
		obj.addEventListener('mousemove', Mouse._onMouseMove);
		obj.addEventListener('mousedown', Mouse._onMouseDown);
		obj.addEventListener('mouseup', Mouse._onMouseUp);
	},
	clear: function() {
		this.event.movementX = 0;
		this.event.movementY = 0;
		this.move = false;
		this.down = false;
		this.up   = false;
	},
	update: function(e) {
		this.event.x    = e.offsetX;
		this.event.y    = e.offsetY;
		this.event.movementX += e.movementX;
		this.event.movementY += e.movementY;
	},
	getMouseMoveEvent: function() {
		console.log(this.event);
		return this.move ? this.event : false;
	},
	getMouseDownEvent: function() {
		return this.down ? this.event : false;
	},
	getMouseUpEvent: function() {
		return this.up ? this.event : false;
	},
	_onMouseMove: function(e) {
		Mouse.update(e);
		Mouse.move = true;
	},
	_onMouseDown: function(e) {
		Mouse.update(e);
		Mouse.down = true;
	},
	_onMouseUp: function(e) {
		Mouse.update(e);
		Mouse.up = true;
	}
};
