Tool.label = 'Tool';
function Tool(filterPane, canvasStage, filter) {
	this.filterPane  = filterPane;
	this.canvasStage = canvasStage;
	this.filter      = filter;
	canvasStage.image.addFilter(this.filter);
	this.addFilter();
}
Tool.prototype.getLabel = function() {
	return this.constructor.label;
};
Tool.prototype.addFilter = function() {
	// building container
	this.container = document.createElement('div');
	this.container.className = 'filter-component';

	// building label
	var label = document.createElement('div');
	label.className = 'pane-label';
	label.innerHTML = this.getLabel();
	this.container.appendChild(label);

	// building remove option
	var remove = document.createElement('a');
	remove.innerHTML = '-';
	remove.title     = 'Remove Filter';
	remove.onclick   = this.removeFilter.bind(this);
	label.appendChild(remove);

	// build order change option up
	var moveUp = document.createElement('a');
	moveUp.innerHTML = '&uarr;';
	moveUp.title     = 'Move Filter Up';
	moveUp.onclick   = this.moveFilterUp.bind(this);
	label.appendChild(moveUp);

	// build order change option down
	var moveDown = document.createElement('a');
	moveDown.innerHTML = '&darr;';
	moveDown.title     = 'Move Filter Down';
	moveDown.onclick   = this.moveFilterDown.bind(this);
	label.appendChild(moveDown);

	// adding controls
	this.addControls();

	// adding filter box
	this.filterPane.appendChild(this.container);
};
Tool.prototype.createInput = function(args) {
	var input = document.createElement('input');
	for (var key in args) input.setAttribute(key, args[key]);
	input.oninput = this.onChange.bind(this);
	input.onchange = function() {
		this.title = this.value;
	};
	this.title = this.value;
	this.container.appendChild(input);
	return input;
};
Tool.prototype.addControls = function() {};
Tool.prototype.onChange = function() {};
Tool.prototype.removeFilter = function() {
	this.canvasStage.image.removeFilter(this.filter);
	this.container.parentNode.removeChild(this.container);
	delete this;
};
Tool.prototype.swapElements = function(obj1, obj2) {
    obj2.nextSibling === obj1
    ? obj1.parentNode.insertBefore(obj2, obj1.nextSibling)
    : obj1.parentNode.insertBefore(obj2, obj1); 
};
Tool.prototype.swapFilters = function(arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};
Tool.prototype.moveFilterUp = function(){
	if (this.container.previousElementSibling.className === 'filter-component'){
		this.swapElements(this.container.previousElementSibling, this.container);
		var i = this.canvasStage.image.__filters.indexOf(this.filter);
		this.swapFilters(this.canvasStage.image.__filters, i, i-1);
	}
};
Tool.prototype.moveFilterDown = function() {
	if(this.container.nextElementSibling) {
		this.swapElements(this.container.nextElementSibling, this.container);
		var i = this.canvasStage.image.__filters.indexOf(this.filter);
		this.swapFilters(this.canvasStage.image.__filters, i, i+1);
	}
};

// blur filter tool
function ToolBlur(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterBlur());
}
ToolBlur.label     = 'Blur';
ToolBlur.prototype = Object.create(Tool.prototype);
ToolBlur.prototype.constructor = ToolBlur;
ToolBlur.prototype.addControls = function() {
	this.input = this.createInput({
		type: 'range',
		min: 0,
		max: 20,
		step: 1,
		value: this.filter.blur
	});
};
ToolBlur.prototype.onChange = function() {
	this.filter.blur = this.input.value;
};

// Brightness filter tool
function ToolBrightness(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterBrightness());
}
ToolBrightness.label     = 'Brightness';
ToolBrightness.prototype = Object.create(Tool.prototype);
ToolBrightness.prototype.constructor = ToolBrightness;
ToolBrightness.prototype.addControls = function(){
	this.input = this.createInput({
		type: 'range',
		min: -1,
		max: 10,
		step: 0.1,
		value: this.filter.brightness
	});
};
ToolBrightness.prototype.onChange = function() {
	this.filter.brightness = this.input.value;
};
// Contrast filter tool
function ToolContrast(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterContrast());
}
ToolContrast.label     = 'Contrast';
ToolContrast.prototype = Object.create(Tool.prototype);
ToolContrast.prototype.constructor = ToolContrast;
ToolContrast.prototype.addControls = function(){
	this.input = this.createInput({
		type: 'range',
		min: 0,
		max: 10,
		step: 0.1,
		value: this.filter.contrast
	});
};
ToolContrast.prototype.onChange = function() {
	this.filter.contrast = this.input.value;
};
// GrayScale filter tool
function ToolGrayScale(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterGrayScale());
}
ToolGrayScale.label     = 'Gray Scale';
ToolGrayScale.prototype = Object.create(Tool.prototype);
ToolGrayScale.prototype.constructor = ToolGrayScale;
ToolGrayScale.prototype.addControls = function(){
	this.input = this.createInput({
		type: 'range',
		min: 0,
		max: 1,
		step: 0.01,
		value: this.filter.grayscale
	});
};
ToolGrayScale.prototype.onChange = function() {
	this.filter.grayscale = this.input.value;
};

// HueRotate filter tool
function ToolHueRotate(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterHueRotate());
}
ToolHueRotate.label     = 'Hue Rotate';
ToolHueRotate.prototype = Object.create(Tool.prototype);
ToolHueRotate.prototype.constructor = ToolHueRotate;
ToolHueRotate.prototype.addControls = function(){
	this.input = this.createInput({
		type: 'range',
		min: 0,
		max: 360,
		step: 1,
		value: this.filter.huerotate
	});
};
ToolHueRotate.prototype.onChange = function() {
	this.filter.huerotate = this.input.value;
};

// ToolInvert filter tool
function ToolInvert(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterInvert());
}
ToolInvert.label     = 'Invert';
ToolInvert.prototype = Object.create(Tool.prototype);
ToolInvert.prototype.constructor = ToolInvert;
ToolInvert.prototype.addControls = function(){
	this.input = this.createInput({
		type: 'range',
		min: 0,
		max: 1,
		step: .01,
		value: this.filter.invert
	});
};
ToolInvert.prototype.onChange = function() {
	this.filter.invert = this.input.value;
};

// ToolSaturate filter tool
function ToolSaturate(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterSaturate());
}
ToolSaturate.label     = 'Saturate';
ToolSaturate.prototype = Object.create(Tool.prototype);
ToolSaturate.prototype.constructor = ToolSaturate;
ToolSaturate.prototype.addControls = function(){
	this.input = this.createInput({
		type: 'range',
		min: 0,
		max: 10,
		step: .1,
		value: this.filter.saturate
	});
};
ToolSaturate.prototype.onChange = function() {
	this.filter.saturate = this.input.value;
};

// ToolSepia filter tool
function ToolSepia(filterPane, canvasStage) {
	Tool.call(this, filterPane, canvasStage, new FilterSepia());
}
ToolSepia.label     = 'Sepia';
ToolSepia.prototype = Object.create(Tool.prototype);
ToolSepia.prototype.constructor = ToolSepia;
ToolSepia.prototype.addControls = function(){
	this.input = this.createInput({
		type: 'range',
		min: 0,
		max: 1,
		step: 0.01,
		value: this.filter.sepia
	});
};
ToolSepia.prototype.onChange = function() {
	this.filter.sepia = this.input.value;
};