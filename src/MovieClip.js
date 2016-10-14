/**
 * this is the constructor for the movieclip object
 * it handles all positioning and style for any kind of
 * canvas graphics
 * @param object args settings object used for initialization
 *                    name        : _name        - MovieClip object name, if not specified one will be created
 *                    x           : _x           - position relative to parent origin
 *                    y           : _y           - position relative to parent origin
 *                    originX     : _originX     - position of origin
 *                    originY     : _originY     - position of origin
 *                    offsetX     : _offsetX     - offset of physical graphic rendered
 *                    offsetY     : _offsetY     - offset of physical graphic rendered
 *                    width       : _width       -  of graphic
 *                    height      : _height      - of graphic
 *                    scaleX      : _scaleX      - of graphic and children
 *                    scaleY      : _scaleY      - of graphic and children
 *                    rotation    : _rotation    - of graphic and children
 *                    alpha       : _alpha       - of graphic and children
 *                    depth       : _depth       - of graphic and children
 *                    visible     : _visible     - boolean
 *                    graphic     : _graphic     - graphic type
 *                    graphicArgs : _graphicArgs - graphic specific options
 *                    onEnterFrame: onEnterFrame - function called every time render is called
 * @return void
 */
MovieClip.prototype = Object.create(DisplayObject.prototype);
function MovieClip(args){
	args                 = args || {};
	this.__children      = [];
	this.__tweens        = {};
	this.__mouseOver     = false;
	this.__prevMouseOver = false;
	this.__mouseEvent    = null;
	this.__uniqueID       = MovieClip.objectCount++;
	this._name           = args._name || MovieClip.getUniqueName(this.__uniqueID);
	this._parent         = null;
	// functions
	this.onEnterFrame    = args.onEnterFrame || null;
	this.onMouseOver     = args.onMouseOver || null;
	this.onMouseOut      = args.onMouseOut || null;
	this.onMouseMove     = args.onMouseMove || null;
	this.onMouseDown     = args.onMouseDown || null;
	this.onMouseUp       = args.onMouseUp || null;
	this.onTouchStart    = args.onTouchStart || null;
	this.onTouchMove     = args.onTouchMove || null;
	this.onTouchEnd      = args.onTouchEnd || null;
	this.onTouchCanceled = args.onTouchCanceled || null;
	//this.onClick         = args.onClick || null;
	this.onResize        = args.onResize || null;
	this.init            = args.init || null;
	// parent constructor
	DisplayObject.call(this,args);
	if (this.init !== null) {
		this.init();
	}
}
/**
 * this static variable should not be used or modifed
 * outside the MovieClip object
 */
MovieClip.objectCount = 0;
/**
 * this function returns a unique string name evertyime
 * @return string
 */
MovieClip.getUniqueName = function(id){
	return 'movieclip'+id;
};
/**
 * this function is used for sorting depth of MovieClips
 * @return numeric
 */
MovieClip.prototype.depthCompare = function(a,b){
	return a._depth == b._depth ? a.__uniqueID - b.__uniqueID : a._depth-b._depth;
};
MovieClip.prototype.__recalculateDepth__ = false;
MovieClip.prototype.setDepth = function(depth) {
	DisplayObject.prototype.setDepth.call(this, depth);
	if (this._parent) {
		this._parent.__recalculateDepth__ = true;
	}
};
/**
 * this function adds the mc MovieClip to this MovieClip
 * @param MovieClip mc MovieClip to add
 * @return added child
 */
MovieClip.prototype.addChild = function(mc) {
	mc._parent     = this;
	this[mc._name] = mc;
	this.__children.push(mc);
	if (this._parent) {
		this._parent.__recalculateDepth__ = true;
	}
	return mc;
};
/**
 * this function removes the mc MovieClip from this MovieClip
 * @param MovieClip mc MovieClip to remove
 * @return void
 */
MovieClip.prototype.removeChild = function(mc) {
	this.__children.splice(this.__children.indexOf(mc),1);
	mc._parent = null;
	delete this[mc._name];
	return this;
};
/**
 * this function adds the tween to the MovieClip
 * @param Tween tween animation to add
 * @return void
 */
MovieClip.tweenCount = 0;
MovieClip.prototype.addTween = function(tween, key) {
	if (key === undefined) {
		key = 'tween'+(++MovieClip.tweenCount);
	}
	if (this.__tweens[key]) {
		delete this.__tweens[key];
	}
	tween.setTarget(this);
	this.__tweens[key] = tween;
	return this;
};
MovieClip.prototype.trigger = function(type, event, bubble) {
	if (!bubble) {
		DisplayObject.prototype.trigger.call(this, type, event);
	}
	this.__children.forEach(function(mc) {
	 	mc.trigger(type, event, bubble);
	});
	if (bubble) {
		DisplayObject.prototype.trigger.call(this, type, event);
	}
};
MovieClip.prototype.tickLogic = function() {
	//console.log(this._name+':'+this.isMouseOver());
	if (this.isMouseOver()) {
		if (this.__prevMouseOver === false) DisplayObject.prototype.trigger.call(this, 'onMouseOver', this.__mouseEvent);
		if (this.__mouseEvent.move) DisplayObject.prototype.trigger.call(this, 'onMouseMove', this.__mouseEvent);
		if (this.__mouseEvent.down) DisplayObject.prototype.trigger.call(this, 'onMouseDown', this.__mouseEvent);
		if (this.__mouseEvent.up) DisplayObject.prototype.trigger.call(this, 'onMouseUp', this.__mouseEvent);
	} else if (this.__prevMouseOver) {
		DisplayObject.prototype.trigger.call(this, 'onMouseOut', this.__mouseEvent);
	}
	this.__prevMouseOver = this.isMouseOver();

	// handling tweens
	for (var i in this.__tweens) {
		this.__tweens[i].tick();
		if (this.__tweens[i].isComplete()) {
			delete this.__tweens[i];
		}
	}
};
MovieClip.prototype.tickGraphics = function(ctx, mouseEvent) {
	// sorting children for graphical display
	if (this.__recalculateDepth__) {
		this.__children.sort(this.depthCompare);
		this.__recalculateDepth__ = false;
	}

	// drawing if visible
	if (this._visible) {
		// save context state
		ctx.save();
		// apply context
		this.applyContext(ctx);
		// adjusting mouseEvent
		mouseEvent = {
			type: 'mouse',
			parentEvent: mouseEvent,
			target: this._name,
			globalX: mouseEvent.globalX,
			globalY: mouseEvent.globalY,
			x: this.__t.a*mouseEvent.x + this.__t.c*mouseEvent.y + this.__t.e,
			y: this.__t.b*mouseEvent.x + this.__t.d*mouseEvent.y + this.__t.f,
			move: mouseEvent.move,
			up: mouseEvent.up,
			down: mouseEvent.down
		};
		// render this objects graphics
		this.renderGraphics(ctx);
		// checking if mouse events should be triggered
		this.setMouseOver(ctx.isPointInPath(mouseEvent.globalX, mouseEvent.globalY));
		this.__mouseEvent = mouseEvent;
		// render child graphics children
		this.__children.forEach(function(mc){
			mc.tickGraphics(ctx, mouseEvent);
		});
		// restoring context
		ctx.restore();
	}
};
MovieClip.prototype.setMouseOver = function(value) {
	this.__mouseOver     = value;
	if (this._parent && value === true) {
		this._parent.setMouseOver(value);
	}
};
MovieClip.prototype.isMouseOver = function() {
	return this.__mouseOver;
};
MovieClip.prototype.isMouseDown = function() {
	return this.__mouseOver && this.__mouseEvent.down;
};
MovieClip.prototype.isMouseUp = function() {
	return this.__mouseOver && this.__mouseEvent.up;
};