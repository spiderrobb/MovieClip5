Portal.prototype = Object.create(PlatformObject.prototype);
function Portal(args) {
	args = Object.assign({
		_toLevel: null,
		_toPortal: null
	}, args);
	this._toLevel = args._toLevel;
	this._toPortal = args._toPortal;
	PlatformObject.call(this, args);
}
Portal.prototype.tickLogic = function() {
	if (this._parent.player.top() < this.bottom() && 
		this._parent.player.bottom() > this.top() && 
		this._parent.player.left() < this.right() && 
		this._parent.player.right() > this.left()
	) {
		if (Key.justDown(Key.ENTER)) {
			this._parent.world.setLevel(this._toLevel);
			this._parent.world.level.player._x = this._parent.world.level[this._toPortal]._x+((this._parent.world.level[this._toPortal]._width-this._parent.world.level.player._width)/2);
			this._parent.world.level.player._y = this._parent.world.level[this._toPortal]._y+this._parent.world.level[this._toPortal]._height-this._parent.world.level.player._height;
			this._parent.world.level.adjustWindow();
		}
		this._graphicArgs.strokeStyle = 'white';
	} else {
		this._graphicArgs.strokeStyle = null;
	}
	PlatformObject.prototype.tickLogic.call(this);
};
