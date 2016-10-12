function EventObject() {
	this.__listeners      = []; 
	this.__eventListeners = {};
}
EventObject.prototype.trigger = function(func, event) {
	// checking current object for a matching function
	if (this[func]) this[func](event);
	// checking if there are any event listeners
	if (this.__eventListeners[func]) {
		this.__eventListeners[func].forEach(function(listener){
			listener(event);
		});
	}
	// loop through __listeners for matching types
	this.__listeners.forEach(function(listener){
		if (listener[func]) listener[func](event);
	});
};
EventObject.prototype.addListener = function(listener) {
	this.__listeners.push(listener);
};
EventObject.prototype.removeListener = function(listener) {
	for (var i=0;i<this.__listeners.length; i++) {
		if (this.__listeners[i] == listener) {
			delete this.__listeners[i];
			this.__listeners.splice(i,1);
			break;
		}
	}
};
EventObject.prototype.addEventListener = function(func, listener) {
	if (!this.__eventListeners[func]) {
		this.__eventListeners[func] = [];
	}
	this.__eventListeners[func].push(listener);
};
EventObject.prototype.removeEventListener = function(func, listener) {
	if (this.__eventListeners[func]) {
		for (var i=0; i<this.__eventListeners[func].length; i++) {
			if (this.__eventListeners[func][i] === listener) {
				delete this.__eventListeners[func][i];
				this.__eventListeners[func].splice(i,1);
				break;
			}
		}
	}
};