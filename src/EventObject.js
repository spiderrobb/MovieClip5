function EventObject() {
	this.listeners = [];
}
EventObject.prototype.listeners = null;
EventObject.prototype.trigger = function(type, event) {
	// checking current object for a matching function
	if (this[type]) this[type](event);
	// loop through listeners for matching types
	this.listeners.forEach(function(listener){
		if (listener[type]) listener[type](event);
	});
};
EventObject.prototype.addListener = function(listener) {
	this.listeners.push(listener);
};
EventObject.prototype.removeListener = function(listener) {
	for (var i=0;i<this.listeners.length; i++) {
		if (this.listeners[i] == listener) {
			delete this.listeners[i];
			this.listeners.splice(i,1);
			break;
		}
	}
};