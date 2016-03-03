export default function(n, p)
{
	if(p <= 0 || p > 1) {
		throw "p should be between 0 and 1"
	}
	let x = 0;

	for(let i = 0; i < n; i++) {
		if(Math.random() < p) x++;
	}
	return x;
}