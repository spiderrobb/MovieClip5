function FilterBlur(value, unit) {
	this.blur = value || 0;
	this.unit = unit || 'px';
}
FilterBlur.prototype.isFilterable = function() {
	return this.blur !== 0;
};
FilterBlur.prototype.toString = function() {
	return 'blur('+this.blur+this.unit+')';
};


function FilterBrightness(value, unit) {
	this.brightness = value || 1;
	this.unit       = unit || '';
}
FilterBrightness.prototype.isFilterable = function() {
	return this.brightness !== 1;
};
FilterBrightness.prototype.toString = function() {
	return 'brightness('+this.brightness+this.unit+')';
};


function FilterContrast(value, unit) {
	this.contrast = value || 1;
	this.unit     = unit || '';
}
FilterContrast.prototype.isFilterable = function() {
	return this.contrast !== 1;
};
FilterContrast.prototype.toString = function() {
	return 'contrast('+this.contrast+this.unit+')';
};


function FilterDropShadow(x, y, blur, color, xunit, yunit, bunit) {
	this.x     = x || 0;
	this.xunit = xunit || 'px';
	this.y     = y || 0;
	this.yunit = yunit || 'px';
	this.blur  = blur || 0;
	this.bunit = bunit || 'px';
	this.color = null;
}
FilterDropShadow.prototype.isFilterable = function() {
	return this.color !== null;
};
FilterDropShadow.prototype.toString = function() {
	return 'drop-shadow('+
		this.x+this.xunit+' '+
		this.y+this.yunit+' '+
		this.blur+this.bunit+' '+
		this.color+')';
};


function FilterGrayScale(value, unit) {
	this.grayscale = value || 0;
	this.unit      = unit || '';
}
FilterGrayScale.prototype.isFilterable = function() {
	return this.grayscale !== 0;
};
FilterGrayScale.prototype.toString = function() {
	return 'grayscale('+this.grayscale+this.unit+')';
};


function FilterHueRotate(value, unit) {
	this.huerotate = value || 0;
	this.unit      = unit || 'deg';
}
FilterHueRotate.prototype.isFilterable = function() {
	return this.huerotate !== 0;
};
FilterHueRotate.prototype.toString = function() {
	return 'hue-rotate('+this.huerotate+this.unit+')';
};


function FilterInvert(value, unit) {
	this.invert = value || 0;
	this.unit = unit || '';
}
FilterInvert.prototype.isFilterable = function() {
	return this.invert !== 0;
};
FilterInvert.prototype.toString = function() {
	return 'invert('+this.invert+this.unit+')';
};


function FilterSaturate(value, unit) {
	this.saturate = value || 1;
	this.unit     = unit || ''; 
}
FilterSaturate.prototype.isFilterable = function() {
	return this.saturate !== 1;
};
FilterSaturate.prototype.toString = function() {
	return 'saturate('+this.saturate+this.unit+')';
};


function FilterSepia(value, unit) {
	this.sepia = value || 0;
	this.unit  = unit || '';
}
FilterSepia.prototype.isFilterable = function() {
	return this.sepia !== 0;
};
FilterSepia.prototype.toString = function() {
	return 'sepia('+this.sepia+this.unit+')';
};