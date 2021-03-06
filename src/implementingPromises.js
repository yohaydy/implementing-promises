function MyPromise(executorfn) {
	var value;
	var state = "pending";
	var deferred;

	function resolver(_value) {
		state = "fulfilled";
		value = _value;
		if (deferred) {
			deferred(value);
		}
	}

	this.then = function(resolutionHandler) {
		if (state === "fulfilled") {
			// resolver() has been called already
			resolutionHandler(value);
		} else if (state === "pending") {
			// resolver() has not been called yet
			deferred = resolutionHandler;
		}
	};

	executorfn(resolver);
}

module.exports = MyPromise;
