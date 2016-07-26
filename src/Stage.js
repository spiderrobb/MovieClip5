Stage.prototype = Object.create(MovieClip.prototype);
function Stage(canvas_id, args) {
	// private vars
	args           = args || {};
	args._name     = 'stage';
	var self       = this,
		_width     = 500,
		_height    = 500,
		_frameRate = args.frameRate || 24,
		_interval  = null,
		_canvas    = document.getElementById(canvas_id),
		_context   = _canvas.getContext('2d'),
		_displayState = args.displayState || 'fit',
	// private function declarations
		_updateDisplay,
		_render;

	// public read only vars
	Object.defineProperty(this, 'width', {
		get: function() {
			return _width;
		}
	});
	Object.defineProperty(this, 'height', {
		get: function() {
			return _height;
		}
	});
	Object.defineProperty(this, 'frameRate', {
		get: function() {
			return _frameRate;
		},
		set: function(fps) {
			if (fps !== _frameRate) {
				_frameRate = fps;
				if (self.isPlaying()) {
					self.stop();
					self.play();
				}
			}
		}
	});
	Object.defineProperty(this, 'displayState', {
		get: function() {
			return _displayState;
		},
		set: function(displayState) {
			_displayState = displayState;
			_updateDisplay();
		}
	});

	function _resize() {
		// updating display
		_updateDisplay();
		self.trigger('onResize', null);
	}
	_render = function() {
		// run logic for tweens and such
		self.trigger('tickLogic', null, true);

		// calling on enter frame
		self.trigger('onEnterFrame', null, true);

		// triggering mouse events
		if (Mouse.move) self.trigger('onMouseMove', Mouse.event);
		if (Mouse.down) self.trigger('onMouseDown', Mouse.event);
		if (Mouse.up)   self.trigger('onMouseUp', Mouse.event);
		Mouse.clear();
		
		// clear context
		_context.clearRect(0, 0, _canvas.width, _canvas.height);

		// render new graphics
		self.tickGraphics(_context);
		
	};
	_updateDisplay = function() {
		// code for making sure canvas resolution matches dpi
		_canvas.width  = _canvas.offsetWidth;
		_canvas.height = _canvas.offsetHeight;
		// logic for screen
		if (_displayState == 'original') {
			self._x = (_canvas.width - self.width)/2;
			self._y = (_canvas.height - self.height)/2;
			self._scaleX = 1;
			self._scaleY = 1;
		} else if (_displayState == 'stretch') {
			self._x = 0;
			self._y = 0;
			self._scaleX = _canvas.width / self.width;
			self._scaleY = _canvas.height / self.height;
		} else if (_displayState == 'fit') {
			self._x = 0;
			self._y = 0;
			self._scaleX = _canvas.width / self.width;
			self._scaleY = _canvas.height / self.height;
			if (self._scaleX > self._scaleY) {
				self._scaleX = self._scaleY;
				self._x = (_canvas.width - self.width*self._scaleX)/2;
			} else {
				self._scaleY = self._scaleX;
				self._y = (_canvas.height - self.height*self._scaleY)/2;
			}
		} else if (_displayState == 'dynamic') {
			// experimental
			_width  = _canvas.offsetWidth;
			_height = _canvas.offsetHeight;
			self._width = _width;
			self._height = _height;
			self._x = 0;
			self._y = 0;
			self._scaleX = 1;
			self._scaleY = 1;
		}
	};

	// public functions
	this.onResize       = null;
	this.onBlur         = null;
	this.onFocus        = null;

	this.play           = function() {
		if (!self.isPlaying()) {
			_interval = setInterval(function() {
				window.requestAnimationFrame(_render);
			}, Math.round(1000/_frameRate));
		}
	};
	this.isPlaying      = function() {
		return _interval !== null;
	};
	this.stop           = function() {
		if (self.isPlaying()) {
			clearInterval(_interval);
			_interval = null;
			// render new graphics
			self.tickGraphics(_context);
		}
	};

	// init extended class
	args._graphic = 'stage';
	MovieClip.call(this, args);
	Mouse.register(_canvas);

	// setting up handler for resize
	window.addEventListener('resize', _resize);

	// setting up handler for blur
	window.addEventListener('blur', function(e) {
		// trigger blur events
		self.trigger('onBlur', null);
	});

	// setting up handler for focus
	window.addEventListener('focus', function(e) {
		// trigger focus events
		self.trigger('onFocus', null);
	});

	// setting up handler for mouseMove
	// _canvas.addEventListener('mousemove', function(e) {
	// 	// triggering event
	// 	self.trigger('onMouseMove', {
	// 		x: e.offsetX,
	// 		y: e.offsetY,
	// 		movementX: e.movementX,
	// 		movementY: e.movementY
	// 	});
	// });
	/*
	_canvas.addEventListener('click', function(e) {
		// triggering event
		self.trigger('onClick', {
			x: e.offsetX,
			y: e.offsetY
		});
	});
	*/
	_resize();
}