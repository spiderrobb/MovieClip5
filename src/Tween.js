/**
 * this function constructs the tween object
 *
 * @param object opts where key is an option
 */
function Tween(opts, callback) {
	// setting up varibles
	this.start         = opts.start || {};
	this.end           = opts.end || false;
	this.frames        = opts.frames || 1;
	this.type          = opts.type || 'linearTween';
	this.current_frame = 0;
	this.callback      = callback === undefined ? null : callback;	
}
Tween.prototype.setTarget = function(target) {
	this.target = target;
	// looping through and populating start if not specified
	for (var i in this.end) {
		if (typeof this.target[i] == 'number') {
			this.start[i] = this.target[i];
		} else {
			// unsupported type for tween
			delete this.end[i];
		}
		if (this.end[i] === this.start[i]) {
			delete this.end[i];
			delete this.start[i];
		}
	}
};
/**
 * this function renders the next phase of the tween
 *
 * @return void
 */
Tween.prototype.tick = function() {
	if (!this.isComplete()) {
		this.current_frame++;
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
};

Tween.prototype.easeInQuad = function (t, b, c, d) {
	return c*(t/=d)*t + b;
};
Tween.prototype.easeOutQuad = function (t, b, c, d) {
	return -c *(t/=d)*(t-2) + b;
};
Tween.prototype.easeInOutQuad = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
};
Tween.prototype.easeInCubic = function (t, b, c, d) {
	return c*(t/=d)*t*t + b;
};
Tween.prototype.easeOutCubic = function (t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};
Tween.prototype.easeInOutCubic = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
};
Tween.prototype.easeInQuart = function (t, b, c, d) {
	return c*(t/=d)*t*t*t + b;
};
Tween.prototype.easeOutQuart = function (t, b, c, d) {
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
};
Tween.prototype.easeInOutQuart = function (t, b, c, d) {
	if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
	return -c/2 * ((t-=2)*t*t*t - 2) + b;
};
Tween.prototype.easeInQuint = function (t, b, c, d) {
	return c*(t/=d)*t*t*t*t + b;
};
Tween.prototype.easeOutQuint = function (t, b, c, d) {
	return c*((t=t/d-1)*t*t*t*t + 1) + b;
};
Tween.prototype.easeInOutQuint = function (t, b, c, d) {
if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	return c/2*((t-=2)*t*t*t*t + 2) + b;
};
Tween.prototype.easeInSine = function (t, b, c, d) {
	return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};
Tween.prototype.easeOutSine = function (t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};
Tween.prototype.easeInExpo = function (t, b, c, d) {
	return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
};
Tween.prototype.easeOutExpo = function (t, b, c, d) {
	return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};
Tween.prototype.easeInOutExpo = function (t, b, c, d) {
	if (t===0) return b;
	if (t===d) return b+c;
	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
	return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};
Tween.prototype.easeInCirc = function (t, b, c, d) {
	return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};
Tween.prototype.easeOutCirc = function (t, b, c, d) {
	return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};
Tween.prototype.easeInOutCirc = function (t, b, c, d) {
	if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
	return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
};
Tween.prototype.easeInElastic = function (t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*0.3;
	if (a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/(2*Math.PI) * Math.asin (c/a);
	return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
};
Tween.prototype.easeOutElastic = function (t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t===0) return b;  if ((t/=d)===1) return b+c;  if (!p) p=d*0.3;
	if (a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/(2*Math.PI) * Math.asin (c/a);
	return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};
Tween.prototype.easeInOutElastic = function (t, b, c, d) {
	var s=1.70158;var p=0;var a=c;
	if (t===0) return b;  if ((t/=d/2)===2) return b+c;  if (!p) p=d*(0.3*1.5);
	if (a < Math.abs(c)) { a=c; s=p/4; }
	else s = p/(2*Math.PI) * Math.asin (c/a);
	if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
};
Tween.prototype.easeInBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158;
	return c*(t/=d)*t*((s+1)*t - s) + b;
};
Tween.prototype.easeOutBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};
Tween.prototype.easeInOutBack = function (t, b, c, d, s) {
	if (s === undefined) s = 1.70158; 
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
	return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
};
Tween.prototype.easeInBounce = function (t, b, c, d) {
	return c - this.easeOutBounce (d-t, 0, c, d) + b;
};
Tween.prototype.easeOutBounce = function (t, b, c, d) {
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	}
};
Tween.prototype.easeInOutBounce = function (t, b, c, d) {
	if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * 0.5 + b;
	return this.easeOutBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
};