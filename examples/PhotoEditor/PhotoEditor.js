function PhotoEditor(photo) {
	var self = this,
		resources = new ResourceLoader();
	// creating tool pane
	this.toolPane      = document.getElementById('tool-pane'); 

	// creating stage
	this.canvasStage   = new Stage('canvas-pane');
	this.canvasStage.play();
	this.toolBar = new ToolBar(this.toolPane, this.canvasStage);

	// adding image to stage
	this.canvasStage.addChild(new MovieClip({
		_name:    'image',
		_graphic: 'image',
		_width:100,
		_height:100,
		_graphicArgs: {
			image: photo
		}
	}));
	this.setImage(photo);
	this.canvasStage.addListener(this);

	// setting up the image uploader
	document.getElementById('file-input').onchange = function() {
		if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
            	resources.loadImage('user_image', e.target.result, function(){
            		self.setImage(resources.user_image);
            	});
            };
            reader.readAsDataURL(this.files[0]);
        }
	};

	// adding tools to toolbar
	this.toolBar.addTool('ToolBlur');
	this.toolBar.addTool('ToolBrightness');
	this.toolBar.addTool('ToolContrast');
	this.toolBar.addTool('ToolGrayScale');
	this.toolBar.addTool('ToolHueRotate');
	this.toolBar.addTool('ToolInvert');
	this.toolBar.addTool('ToolSaturate');
	this.toolBar.addTool('ToolSepia')
}
PhotoEditor.prototype.setImage = function(photo) {
	this.canvasStage.image._width = photo.width;
	this.canvasStage.image._height = photo.height;
	this.canvasStage.image._originX = -photo.width/2;
	this.canvasStage.image._originY = -photo.height/2;
	this.canvasStage.image._graphicArgs = {
		image: photo
	};
	this.adjustImage();
};
PhotoEditor.prototype.onResize = function() {
	this.adjustImage();
};
PhotoEditor.prototype.adjustImage = function() {
	var limiter = this.canvasStage._width/this.canvasStage.image._width;
	if (limiter > this.canvasStage._height/this.canvasStage.image._height) {
		limiter = this.canvasStage._height/this.canvasStage.image._height;
	}
	this.canvasStage.image._scaleX = limiter;
	this.canvasStage.image._scaleY = limiter;
	this.canvasStage.image._x = this.canvasStage._width/2;
	this.canvasStage.image._y = this.canvasStage._height/2;
	console.log(this.canvasS)
};