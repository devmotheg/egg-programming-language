/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import Enviroment from "./enviroment.js";

const Interpreter = (_ => {
  const evaluate = (expr, scope) => {
    if (expr.type === "value") return expr.value;
    else if (expr.type === "word") {
      if (expr.name in scope) return scope[expr.name];
      else throw new SyntaxError(`Undefined binding '${expr.name}'`);
    } else if (expr.type === "apply") {
      const { operator, args } = expr;
      if (operator.type === "word" && operator.name in Enviroment.specialForms)
        return Enviroment.specialForms[operator.name](args, scope, evaluate);
      else {
        let op = evaluate(operator, scope);
        if (typeof op === "function")
          return op(...args.map(arg => evaluate(arg, scope)));
        throw new SyntaxError("Applying a non-function");
      }
    }
  };

  return {
    evaluate,
  };
})();

export default Interpreter;
