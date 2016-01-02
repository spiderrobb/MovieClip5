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
	this._children       = [];
	this._tweens         = [];
	this._uniqueID       = MovieClip.objectCount++;
	this._name           = args.name || MovieClip.getUniqueName(this._uniqueID);
	this._parent         = null;
	// functions
	//this.onMouseMove     = args['onMouseMove'] || null;
	//this.onMouseDown     = args['onMouseDown'] || null;
	//this.onMouseUp       = args['onMouseUp'] || null;
	//this.onMouseOver     = args['onMouseOver'] || null;
	this.onEnterFrame    = args.onEnterFrame || null;
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
	var name = 'movieclip'+id;
	return name;
};
/**
 * this function is used for sorting depth of MovieClips
 * @return numeric
 */
MovieClip.prototype.depthCompare = function(a,b){
	return a._depth == b._depth ? a._uniqueID - b._uniqueID : a._depth-b._depth;
};
/**
 * this function adds the mc MovieClip to this MovieClip
 * @param MovieClip mc MovieClip to add
 * @return added child
 */
MovieClip.prototype.addChild = function(mc) {
	mc._parent     = this;
	this[mc._name] = mc;
	this._children.push(mc);
	return mc;
};
/**
 * this function adds the tween to the MovieClip
 * @param Tween tween animation to add
 * @return void
 */
MovieClip.prototype.addTween = function(tween) {
	this._tweens.push(tween);
};
/**
 * this function removes the mc MovieClip from this MovieClip
 * @param MovieClip mc MovieClip to remove
 * @return void
 */
MovieClip.prototype.removeChild = function(mc) {
	this._children.splice(this._children.indexOf(mc),1);
	mc._parent = null;
	delete this[mc._name];
};
/**
 * this function returns the bounding box of the movieclip
 * used for hit tests when not specified
 * @return object
 */
// MovieClip.prototype.getBoundingBox = function() {
// 	return {
// 		x: this._x+this._offsetX,
// 		y: this._y+this._offsetY,
// 		width: this._width,
// 		height: this._height
// 	};
// };
/**
 * this function returns true of the MovieClip specified satisfies
 * the requirements of a "collision" or overlapping area
 * @param MovieClip mc movieclip to hit test
 * @return boolean
 */
// MovieClip.prototype.hitTest = function(mc) {
// 	var rect1 = this.getBoundingBox(),
// 		rect2 = mc.getBoundingBox();
// 	return rect1.x < rect2.x + rect2.width
// 		&& rect1.x + rect1.width > rect2.x
// 		&& rect1.y < rect2.y + rect2.height
// 		&& rect1.height + rect1.y > rect2.y;
// };
// MovieClip.prototype.pointHitTest = function(point) {
// 	var rect1 = this.getBoundingBox();
// 	return rect1.x < point.x
// 		&& rect1.x + rect1.width > point.x
// 		&& rect1.y < point.y
// 		&& rect1.height + rect1.y > point.y;
// };
MovieClip.prototype.tickLogic = function() {
	// handling tweens
	for (var i in this._tweens) {
		this._tweens[i].tick();
		if (this._tweens[i].isComplete()) {
			delete this._tweens[i];
			this._tweens.splice(i,1);
		}
	}

	// running logic tick for all children
	this._children.forEach(function(mc) {
		mc.tickLogic();
	});

	// running on enter frame if exists
	if (this.onEnterFrame) {
		this.onEnterFrame();
	}
};
// MovieClip.prototype.tickEvents   = function(ctx) {
// 	// maybe?
// };
MovieClip.prototype.tickGraphics = function(ctx) {
	// sorting children for graphical display
	this._children.sort(this.depthCompare);

	// drawing if visible
	if (this._visible) {
		// save context state
		ctx.save();
		// apply context
		this.applyContext(ctx);
		// render this objects graphics
		this.renderGraphics(ctx);
		// render child graphics children
		this._children.forEach(function(mc){
			mc.tickGraphics(ctx);
		});
		// restoring context
		ctx.restore();
	}
};