Stage.prototype = Object.create(MovieClip.prototype);
function Stage(canvas_id, args) {
	// private vars
	args               = args || {};
	args._name         = 'stage';
	var self           = this,
		_frameRate     = args.frameRate || 0,
		_interval      = null,
		_canvas        = document.getElementById(canvas_id),
		_context       = _canvas.getContext('2d'),
		_displayState  = args.displayState || 'dynamic',
		_lastFrameTime = 0,
	// private function declarations
		_updateDisplay,
		_render,
		_resize;

	Object.defineProperty(this, 'frameRate', {
		get: function() {
			return _frameRate;
		},
		set: function(fps) {
			if (fps !== _frameRate) {
				_frameRate = fps;
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

	_resize = function() {
		// updating display
		_updateDisplay();
		self.trigger('onResize');
	};
	_render = function(time) {
		if (time-_lastFrameTime >= 1000/_frameRate || _frameRate === 0) {
			_lastFrameTime = time;
			
			// clear canvas
			_context.clearRect(0, 0, _canvas.width, _canvas.height);

			// render new graphics
			self.tickGraphics(_context, Mouse.event);

			// run logic for tweens and such
			self.trigger('tickLogic', null, true);

			// calling on enter frame
			self.trigger('onEnterFrame');
			
			// clear input context
			Mouse.clear();
			Key.clear();
		}
		_interval = window.requestAnimationFrame(_render);
	};
	//_renderTimer = function
	_updateDisplay = function() {
		// code for making sure canvas resolution matches dpi
		_canvas.width  = _canvas.offsetWidth;
		_canvas.height = _canvas.offsetHeight;
		// logic for screen
		if (_displayState == 'original') {
			self._x = (_canvas.width - self._width)/2;
			self._y = (_canvas.height - self._height)/2;
			self._scaleX = 1;
			self._scaleY = 1;
		} else if (_displayState == 'stretch') {
			self._x = 0;
			self._y = 0;
			self._scaleX = _canvas.width / self._width;
			self._scaleY = _canvas.height / self._height;
		} else if (_displayState == 'fit') {
			self._x = 0;
			self._y = 0;
			self._scaleX = _canvas.width / self._width;
			self._scaleY = _canvas.height / self._height;
			if (self._scaleX > self._scaleY) {
				self._scaleX = self._scaleY;
				self._x = (_canvas.width - self._width*self._scaleX)/2;
			} else {
				self._scaleY = self._scaleX;
				self._y = (_canvas.height - self._height*self._scaleY)/2;
			}
		} else if (_displayState == 'dynamic') {
			// experimental
			self._width = _canvas.offsetWidth;
			self._height = _canvas.offsetHeight;
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
			_interval = window.requestAnimationFrame(_render);
		}
	};
	this.isPlaying      = function() {
		return _interval !== null;
	};
	this.stop           = function() {
		if (self.isPlaying()) {
			window.cancelAnimationFrame(_interval);
			//clearInterval(_interval);
			_interval = null;
			// render new graphics
			self.tickGraphics(_context, Mouse.event);
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
		self.trigger('onBlur');
	});

	// setting up handler for focus
	window.addEventListener('focus', function(e) {
		// trigger focus events
		self.trigger('onFocus');
	});
	_resize();
}