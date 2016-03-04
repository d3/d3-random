export default function(alpha) {
    if (arguments.length != 1) {
        throw new SyntaxError("pareto(alpha) must be called with only the alpha parameter.");
    }
    if (alpha <= 0) {
        throw new SyntaxError("pareto(alpha) must be called with alpha > 0.");
    }
    return function() {
        return 1.0 / Math.pow((1 - Math.random()), 1.0 / alpha);
    };
}