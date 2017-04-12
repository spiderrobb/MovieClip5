function ToolBar(toolPane, canvasStage) {
	// creating tool container
	this.pane              = toolPane;
	this.canvasStage       = canvasStage;
	this.toolBar           = document.getElementById('tool-bar');

	// adding filter section
	this.filterPane = document.getElementById('filter-pane');
}
ToolBar.prototype.addTool = function(tool) {
	var self   = this;
	var button = document.createElement('button');
	button.innerHTML = window[tool].label;
	button.onclick = function() {
		new window[tool](self.filterPane, self.canvasStage);
	};
	this.toolBar.appendChild(button);
};
