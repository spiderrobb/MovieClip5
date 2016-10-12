/**
 * this singleton class gives us a way to check if a key is currently down
 */
var Key = {
	// class constants
	BACKSPACE: 8,
	CAPSLOCK: 20,
	CONTROL: 17,
	DELETEKEY: 46,
	DOWN: 40,
	END: 35,
	ENTER: 13,
	ESCAPE: 27,
	HOME: 36,
	INSERT: 45,
	LEFT: 37,
	PGDN: 34,
	PGUP:33,
	RIGHT: 39,
	SHIFT: 16,
	SPACE: 32,
	TAB: 9,
	UP: 38,

	// sudo private variables and functions
	//_listeners: {},
	_state : {},
	_justPressed: {},
	_justReleased: {},
	_lastKeyCode: null,
	_onPress: function(event) {
		if (Key._state[event.keyCode] === undefined) {
			Key._lastKeyCode = event.keyCode;
			if (Key.onKeyDown !== null) Key.onKeyDown();
			Key._justPressed[event.keyCode] = true;
		}
		Key._state[event.keyCode] = true;
	},
	_onRelease: function(event) {
		if (Key._state[event.keyCode]) {
			Key._lastKeyCode = event.keyCode;
			if (Key.onKeyUp !== null) Key.onKeyUp();
			Key._justReleased[event.keyCode] = true;
			delete Key._state[event.keyCode];
		}
	},

	// overwritable functions
	onKeyDown: null,
	onKeyUp: null,

	// methods
	clear: function() {
		delete Key._justReleased;
		Key._justReleased = {};
		delete Key._justPressed;
		Key._justPressed = {};
	},
	justDown: function(keyCode) {
		return Key._justPressed[keyCode] || false;
	},
	justUp: function(keyCode) {
		return Key._justReleased[keyCode] || false;
	},
	isDown: function(keyCode) {
		return Key._state[keyCode] || false;
	},

	getCode: function() {
		return Key._lastKeyCode;
	}
};
// setting up listeners
document.addEventListener('keydown', Key._onPress);
document.addEventListener('keyup', Key._onRelease);