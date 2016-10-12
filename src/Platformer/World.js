function World(stage) {
	this.stage  = stage;
	this.levels = {};
	this.level  = null;
}
World.prototype.newLevel = function(key, args) {
	return this.addLevel(key, new Level(this, args));
};
World.prototype.addLevel = function(key, level) {
	if (level instanceof Level) {
		this.levels[key] = level;
		return level;
	}
};
World.prototype.setLevel = function(key) {
	if (this.level !== null) {
		this.stage.removeChild(this.level);
	}
	this.level = this.levels[key];
	this.stage.addChild(this.level);
};
