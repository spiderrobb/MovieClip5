/**
 * this function creates the resource loadar object
 */
function ResourceLoader() {
	this._loadedResources = 0;
	this._totalResources  = 0;
}
/**
 * this funcion loads a single image
 *
 * @param string   key      name of resource
 * @param string   url      url of resource or image
 * @param function callback callback function to be called when resource is loaded
 *
 * @return void
 */
ResourceLoader.prototype.loadImage = function(key, url, callback) {
	this[key]        = new Image();
	this[key].onload = callback;
	this[key].src    = url;
};
/**
 * this function loads a list of images
 *
 * @param object   images   where key is resource name and value is resource url
 * @param function callback function to be called on progress
 *
 * @return void
 */
ResourceLoader.prototype.loadImages = function(images, callback) {
	var self = this;
	for (var i in images) {
		self._totalResources++;
		self.loadImage(i, images[i], function(){
			self._loadedResources++;
			if (callback) {
				callback(self._totalResources, self._loadedResources);
			}
		});
	}
};
