export default function(p) {
	if (arguments.length != 1) {
		throw new SyntaxError("geometric(probability) must be called with only the probability parameter.");
	}
	if(p <= 0 || p > 1) {
		throw new SyntaxError("geometric(probability) should be called with 0 < probability <= 1.");
	}
	return function() {
		return Math.floor(Math.log(Math.random()) / Math.log(1 - p));
	}
}