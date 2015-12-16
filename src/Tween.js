/**
 * this function constructs the tween object
 *
 * @param object opts where key is an option
 */
function Tween(opts, callback) {
	// setting up varibles
	this.target        = opts['target'];
	this.start         = opts['start'] || {};
	this.end           = opts['end'] || false;
	this.frames        = opts['frames'] || 1;
	this.type          = opts['type'] || 'linearTween';
	this.current_frame = 0;
	this.callback      = callback == undefined ? null : callback;
	this.ratio         = 0;

	// looping through and populating start if not specified
	for (var i in this.end) {
		if (typeof this.target[i] == 'number') {
			this.start[i] = this.target[i];
		} else {
			// unsupported type for tween
			delete this.end[i];
		}
	}
}
/**
 * this function renders the next phase of the tween
 *
 * @return void
 */
Tween.prototype.tick = function() {
	if (!this.isComplete()) {
		this.ratio = ++this.current_frame/this.frames;
		for (var i in this.end) {
			this.target[i] = this[this.type](
				this.current_frame,
				this.start[i],
				this.end[i]-this.start[i],
				this.frames
			);
		}
		if (this.isComplete() && this.callback !== null) {
			this.callback();
		}
	}
};
/**
 * this function returns if the tween is complete
 *
 * @return boolean
 */
Tween.prototype.isComplete = function() {
	return this.frames == this.current_frame;
};
/**
 * this function resets the animation of the tween
 *
 * @return void
 */
Tween.prototype.reset = function() {
	this.current_frame = 0;
};
/**
 * this function describes a linear Tween
 *
 * @param number t time marker
 * @param number b the begining value
 * @param number c end value minus begining value
 * @param number d total number of frames
 *
 * @return int new value
 */
Tween.prototype.linearTween = function(t,b,c,d) {
	return c*t/d + b;
};
/**
 * this function describes a ease in out sine Tween
 *
 * @param number t time marker
 * @param number b the begining value
 * @param number c end value minus begining value
 * @param number d total number of frames
 *
 * @return int new value
 */
Tween.prototype.easeInOutSine = function (t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
}