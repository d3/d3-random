export default function(n, p)
{
	if (arguments.length != 2) {
		throw new SyntaxError("binomial(number, probability) must be called with only the number and probability parameters.");
	}
	if(n < 0) {
		throw new SyntaxError("binomial(number, probability) should be called with number >= 0.");
	}
	if(p <= 0 || p > 1) {
		throw new SyntaxError("binomial(number, probability) should be called with 0 < probability <= 1.");
	}
	return function () {
		let x = 0;

		for(let i = 0; i < n; i++) {
			if(Math.random() < p) {
				x++;
			}
		}
		return x;
	}
}