function DisplayObject(args) {
	args             = args || {};
	// MovieClip Position on canvas
	this._x              = args._x !== undefined ? args._x : 0;
	this._y              = args._y !== undefined ? args._y : 0;
	// MovieClip Origin relative for rotation
	this._originX        = args._originX !== undefined ? args._originX : 0;
	this._originY        = args._originY !== undefined ? args._originY : 0;
	// dimensions for graphic (does not effect children)
	this._width          = args._width !== undefined ? args._width : 0;
	this._height         = args._height !== undefined ? args._height : 0;
	// MovieClip Scale (includes children)
	this._scaleX         = args._scaleX !== undefined ? args._scaleX : 1;
	this._scaleY         = args._scaleY !== undefined ? args._scaleY : 1;
	// skew
	this._skewX          = args._skewX !== undefined ? args._skewX : 0;
	this._skewY          = args._skewY !== undefined ? args._skewY : 0;
	// MovieClip Rotation
	this._rotation       = args.args_rotation !== undefined ? args._rotation : 0;
	// MovieClip opacity
	this._alpha          = args._alpha !== undefined ? args._alpha : 1;
	// MovieClip Depth Highest number wins
	this._depth          = args._depth !== undefined ? args._depth : 1;
	// MovieClip Bisibility, onEnterFrame will still get called
	this._visible        = args._visible || true;
	// Graphic type
	this._graphic        = args._graphic || 'rectangle';
	// graphic options
	this._graphicArgs    = args._graphicArgs || {};
	// image smoothing
	this._smoothImage    = args._smoothImage || 'inherit';
}
DisplayObject.prototype.applyContext = function(ctx){
	// applying alpha
	if (this._alpha !== 1) ctx.globalAlpha *= this._alpha;
	// applying x y coordinates
	if (this._x !== 0 || this._y !== 0) ctx.translate(this._x, this._y);
	// applying scaling
	if (this._scaleX !== 1 || this._scaleY !== 1) ctx.scale(this._scaleX, this._scaleY);
	// applying rotation
	if (this._rotation !== 0) ctx.rotate(this._rotation * Math.PI/180);
	// skew
	if (this._skewX !== 0 || this._skewY !== 0) ctx.transform(1, this._skewX, this._skewY, 1, 0, 0);
	// applying origin shift
	if (this._originX !== 0 || this._originY !== 0) ctx.translate(this._originX, this._originY);
	// applying image smoothing
	if (this._smoothImage !== 'inherit') ctx.imageSmoothingEnabled = this._smoothImage;
};
/**
 * this function is responsible for the graphical
 * rendering of this MovieClip based on this._graphic
 * since there are many different types of graphics
 * and they do not all share the same attributes
 * all specialized attributes should be stored in
 * this._graphicArgs object
 * graphic types: rectangle, ellipse, text, image, imageSprite
 * @param CanvasRenderingContext2D ctx the canvas 2d context
 * @return void
 */
DisplayObject.prototype.renderGraphics = function(ctx){
	// calculating color of fill and stroke
	if (this._graphicArgs.fillStyle !== undefined)
		ctx.fillStyle = this._graphicArgs.fillStyle;
	if (this._graphicArgs.strokeStyle !== undefined)
		ctx.strokeStyle = this._graphicArgs.strokeStyle;

	// rectangle
	if (this._graphic === 'stage') {
		ctx.beginPath();
		ctx.rect(0, 0, this._width, this._height);
		ctx.clip();
	} else if (this._graphic === 'rectangle') {
		ctx.beginPath();
		ctx.rect(0, 0, this._width, this._height);
		if (this._graphicArgs.fillStyle !== undefined)   ctx.fill();
		if (this._graphicArgs.strokeStyle !== undefined) ctx.stroke();

		// ellipse
	} else if (this._graphic === 'ellipse') {
		ctx.beginPath();
		ctx.ellipse(
			0, 0,
			this._width/2, this._height/2,
			this._graphicArgs.rotation || 0,
			this._graphicArgs.startAngle || 0,
			this._graphicArgs.endAngle || 2*Math.PI,
			this._graphicArgs.anticlockwise || false
		);
		if (this._graphicArgs.fillStyle !== undefined) ctx.fill();
		if (this._graphicArgs.strokeStyle !== undefined) ctx.stroke();

		// text
	} else if (this._graphic === 'text') {
		if (this._graphicArgs.font !== undefined)
			ctx.font = this._graphicArgs.font;
		if (this._graphicArgs.textAlign !== undefined)
			ctx.textAlign = this._graphicArgs.textAlign;
		if (this._graphicArgs.textBaseline !== undefined)
			ctx.textBaseline = this._graphicArgs.textBaseline;
		if (this._graphicArgs.fillStyle !== undefined)
			ctx.fillText(
				this._graphicArgs.text || 'Text Graphic',
				0, 0
			);
		if (this._graphicArgs.strokeStyle !== undefined)
			ctx.strokeText(
				this._graphicArgs.text || 'Text Graphic',
				0, 0
			);

		// image
	} else if (this._graphic === 'image') {
		if (this._width === null || this._height === null) {
			ctx.drawImage(
				this._graphicArgs.image,
				0, 0
			);
		} else {
			ctx.drawImage(
				this._graphicArgs.image,
				0, 0,
				this._width, this._height
			);
		}

		// imageSprite
	} else if (this._graphic === 'imageSprite') {
		ctx.drawImage(
			this._graphicArgs.image,
			this._graphicArgs.sx, this._graphicArgs.sy,
			this._graphicArgs.swidth, this._graphicArgs.sheight,
			0, 0,
			this._width, this._height
		);
	}
};