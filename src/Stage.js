Stage.prototype = Object.create(MovieClip.prototype);
function Stage(canvas_id, args) {
	// private vars
	args           = args || {};
	var self       = this,
		_width     = 500,
		_height    = 500,
		_frameRate = args.frameRate || 24,
		_listeners = [],
		_interval  = null,
		_canvas    = document.getElementById(canvas_id),
		_context   = _canvas.getContext('2d'),
		_displayState = args.displayState || 'fit',
	// private function declarations
		_fullScreen,
		_resize,
		_updateDisplay,
		_isPlaying,
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
				if (_isPlaying()) {
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

	// private functions
	_fullScreen = function() {
		self.onFullScreen();
		_listeners.forEach(function(listener){
			if (listener.onFullScreen) {
				listener.onFullScreen();
			}
		});
	};
	_resize = function() {
		// updating display
		_updateDisplay();

		// calling resize function
		self.onResize();

		// checing listeners
		_listeners.forEach(function(listener){
			if (listener.onResize) {
				listener.onResize();
			}
		});
	};
	_isPlaying = function() {
		return _interval !== null;
	};
	_render = function() {
		//window.requestAnimationFrame(_render);
		// run logic
		self.tickLogic();

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
	// _mouseMove = function(e) {
	// 	var myEvent = {
	// 		x: e.offsetX,
	// 		y: e.offsetY,
	// 		movementX: e.movementX,
	// 		movementY: e.movementY
	// 	};
	// 	//console.log(myEvent);
	// };

	// public functions
	this.onFullScreen   = function(){};
	this.onResize       = function(){};
	this.addListener    = function(listener) {
		_listeners.push(listener);
	};
	this.removeListener = function(listener) {
		for (var i in this._listeners) {
			if (this._listeners[i] == listener) {
				delete this._listeners[i];
				this._listeners.splice(i,1);
				break;
			}
		}
	};
	this.play           = function() {
		if (!_isPlaying()) {
			_interval = setInterval(function() {
				window.requestAnimationFrame(_render);
			}, Math.round(1000/_frameRate));
		}
	};
	this.stop           = function() {
		if (_isPlaying()) {
			clearInterval(_interval);
			_interval = null;
		}
	};

	// init extended class
	args._graphic = 'stage';
	MovieClip.call(this, args);
	window.addEventListener('resize', _resize);
	//_canvas.addEventListener('mousemove', _mouseMove);
	_resize();
}