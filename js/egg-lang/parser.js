/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

const Parser = (_ => {
	const skipSpace = string => {
		let match;
		while ((match = /^\s|^(#[^]*?\n)/.exec(string)))
			string = string.slice(match[0].length);
		return string;
	};

	const parseApply = (expr, program) => {
		program = skipSpace(program);
		if (program[0] !== "(") return { expr, rest: program };
		program = skipSpace(program.slice(1));
		expr = { type: "apply", operator: expr, args: [] };
		while (program[0] !== ")") {
			let arg = parseExpression(program);
			expr.args.push(arg.expr);
			program = skipSpace(arg.rest);
			if (!(program[0] in { ",": true, ")": true }))
				throw new SyntaxError("Expected ',' or ')'");
			if (program[0] === ",") program = skipSpace(program.slice(1));
		}
		return parseApply(expr, program.slice(1));
	};

	const parseExpression = program => {
		program = skipSpace(program);
		if (!program.length)
			return { expr: { type: null, value: null }, rest: program };
		const isString = /^"([^"]*)"/,
			isNumber = /^-?\d+/,
			isBinding = /^[^\s(),#]+/;
		let expr, match;
		if ((match = isString.exec(program)))
			expr = { type: "value", value: match[1] };
		else if ((match = isNumber.exec(program)))
			expr = { type: "value", value: Number(match[0]) };
		else if ((match = isBinding.exec(program)))
			expr = { type: "word", name: match[0] };
		else throw new SyntaxError(`Unexpected token '${program}'`);
		return parseApply(expr, program.slice(match[0].length));
	};

	const parse = program => {
		const { expr, rest } = parseExpression(program);
		if (skipSpace(rest).length > 0)
			throw new SyntaxError(`Unexpected token '${rest}' after program`);
		return expr;
	};

	return {
		parse,
	};
})();

export default Parser;
