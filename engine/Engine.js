function Engine() {
	this.__t             = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
	this._rotation       = 0;
	this._rotationOffset = 0;
	this._x              = 600;
	this._y              = 400;
	this._mcs            = {};
	this._v              = 30;
	this._angles         = 360;
	this._angleN         = 0;
	this._angleD         = 0;
	this._tv             = 4;
	this._cameraMode     = 'follow';
}
Engine.prototype.addObject = function(x, y, mc) {
	if (!this._mcs[x]) {
		this._mcs[x] = {};
	}
	this._mcs[x][y] = mc;
};
Engine.prototype.updateMatrix = function() {
	// resetting matrix
	this.__t.a = 1;
	this.__t.b = 0;
	this.__t.c = 0;
	this.__t.d = 1;
	this.__t.e = 0;
	this.__t.f = 0;

	// adjusting height for depth of field
	this.__t = this.__t.scaleNonUniform(1, 0.5);
	this.__t = this.__t.rotate(this._angleD);
	this.__t = this.__t.translate(this._x, this._y);
};
Engine.prototype.tick = function() {
	this.readUserInput();
	this.updateMatrix();
	this.placeObjects();
};
Engine.prototype.placeObjects = function() {
	for (var x in this._mcs) {
		for (var y in this._mcs[x]) {
			this._mcs[x][y]._x = this.__t.a*x + this.__t.c*y + this.__t.e;
			this._mcs[x][y]._y = this.__t.b*x + this.__t.d*y + this.__t.f;
			this._mcs[x][y]._depth = this._mcs[x][y]._y;
			if (this._mcs[x][y].setAngle) {
				this._mcs[x][y].setAngle((this._angleN+this._mcs[x][y]._angle)%this._angles);
			}
		}
	}
};
Engine.prototype.readUserInput = function() {
	// in independant mode camera may be rotated independently of player direction
	if (this._cameraMode === 'independent') {
		// experimental
		if (Key.isDown(65)) {
			this._rotationOffset -= this._tv;
		} else if (Key.isDown(68)) {
			this._rotationOffset += this._tv;
		}
	}

	// capturing player rotation
	if(Key.isDown(Key.LEFT)) {
		this._rotation += this._tv;
	} else if (Key.isDown(Key.RIGHT)) {
		this._rotation -= this._tv;
	}
	this._rotation %= 360;

	// calculating angle of camera based on number of angles and rotation/offset
	this._angleN = Math.round((this._rotation+this._rotationOffset)/(360/this._angles));
	this._angleN = (this._angleN+this._angles)%this._angles;
	this._angleD = this._angleN*360/this._angles;

	// capturing player movement
	if (Key.isDown(Key.UP)) {
		this._x += this._v*Math.sin(this._angleD*Math.PI/180);
		this._y += this._v*Math.cos(this._angleD*Math.PI/180);
		// this._y += 10;
	} else if (Key.isDown(Key.DOWN)) {
		this._x -= this._v*Math.sin(this._angleD*Math.PI/180);
		this._y -= this._v*Math.cos(this._angleD*Math.PI/180);
	}

	//console.log(this._ange)
};
Engine.prototype.setCameraMode = function(mode) {
	this._cameraMode = mode;
	if (this._cameraMode === 'independent') {
		this._rotationOffset = 0;
	}
};
Engine.prototype.toString = function() {
	return 'X: '+this._x+' Y:'+this._y+' R:'+this._rotation+' RO:'+this._rotationOffset+' AN:'+this._angleN+' AD:'+this._angleD;
}

IsoMovieClip.prototype = Object.create(MovieClip.prototype);
function IsoMovieClip(args){
	this._angle   = args._angle !== undefined ? args._angle : 0;
	this.setAngle = args.setAngle || null;
	// call parent constructor
	MovieClip.call(this, args);
};

function getPerson(color) {
	return new IsoMovieClip({
		init: function() {
			this.addChild(new MovieClip({
				_name:'body',
				_height:150,
				_width:50,
				_x:-25,
				_y:-150,
				_graphic: 'rectangle',
				_graphicArgs: {
					fillStyle: color,
					strokeStyle: "black"
				}
			}));
			this.addChild(new MovieClip({
				_name:'head',
				_height: 80,
				_width: 80,
				_x: 0,
				_y: -180,
				_graphic: 'ellipse',
				_graphicArgs: {
					fillStyle: color,
					strokeStyle: 'black'
				}
			}));
		}
	});
}