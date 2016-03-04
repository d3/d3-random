export default function(alpha) {
    return function() {
        if (arguments.length != 1) {
            throw new SyntaxError("pareto(alpha) must be called with only the alpha parameter.");
        }
        return 1.0 / Math.pow((1 - Math.random()), 1.0 / alpha);
    };
}