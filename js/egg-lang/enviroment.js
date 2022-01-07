/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import Log from "../modules/log.js";

const Enviroment = (_ => {
  const defineSpecialForms = obj => {
    obj.if = (args, scope, evaluate) => {
      if (args.length !== 3)
        throw new SyntaxError("Only 3 arguments must be passed to if");
      if (evaluate(args[0], scope)) return evaluate(args[1], scope);
      else return evaluate(args[2], scope);
    };

    obj.while = (args, scope, evaluate) => {
      if (args.length !== 2)
        throw new SyntaxError("Only 2 arguments must be passed to while");
      while (evaluate(args[0], scope)) evaluate(args[1], scope);
      return false;
    };

    obj.do = (args, scope, evaluate) => {
      let value = false;
      for (const arg of args) value = evaluate(arg, scope);
      return value;
    };

    obj.def = (args, scope, evaluate) => {
      if (args.length !== 2 || args[0].type !== "word")
        throw new SyntaxError("Incorrect use of def");
      if (Object.hasOwnProperty.call(scope, args[0].name))
        throw new SyntaxError(`Binding '${args[0].name}' already declared`);
      const value = evaluate(args[1], scope);
      scope[args[0].name] = value;
      return value;
    };

    obj.set = (args, scope, evaluate) => {
      const traceScope = scope => {
        if (Object.hasOwnProperty.call(scope, args[0].name)) return scope;
        return traceScope(Object.getPrototypeOf(scope));
      };

      if (args.length !== 2 || args[0].type !== "word")
        throw new SyntaxError("Incorrect use of set");
      if (scope[args[0].name] === undefined)
        throw new ReferenceError(`Undefined Binding '${args[0].name}'`);
      const value = evaluate(args[1], scope);
      traceScope(scope)[args[0].name] = value;
      return value;
    };

    obj.fun = (args, scope, evaluate) => {
      if (!args.length) throw new SyntaxError("Functions need a body");
      const body = args[args.length - 1];
      const params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type !== "word")
          throw new SyntaxError("Parameter names must be of type word");
        return expr.name;
      });

      return function () {
        if (arguments.length !== params.length)
          throw new TypeError("Wrong number of arguments");
        const localScope = Object.create(scope);
        for (let i = 0; i < params.length; i++)
          localScope[params[i]] = arguments[i];
        return evaluate(body, localScope);
      };
    };

    obj.print = (args, scope, evaluate) => {
      let output = args
        .map(arg => {
          arg = evaluate(arg, scope);
          if (arg instanceof Array) arg = `[${arg}]`;
          return arg;
        })
        .toString();
      output = output.replace(/,/g, ", ");
      Log.display("byte", output);
      return false;
    };

    obj["[].from"] = (args, scope, evaluate) => {
      return args.map(arg => evaluate(arg, scope));
    };

    obj["[].len"] = (args, scope, evaluate) => {
      const arr = args[0] ? evaluate(args[0], scope) : null;
      if (args.length !== 1 || !(arr instanceof Array))
        throw new SyntaxError("Incorrect use of len");
      return arr.length;
    };

    obj["[].elem"] = (args, scope, evaluate) => {
      const arr = args[0] ? evaluate(args[0], scope) : null,
        index = args[1] ? evaluate(args[1], scope) : null;
      if (
        args.length !== 2 ||
        !(arr instanceof Array) ||
        !(typeof index === "number")
      )
        throw new SyntaxError("Incorrect use of elem");
      if (index < 0 || index >= arr.length)
        throw new TypeError("Index out of bounds");
      return arr[index];
    };

    return obj;
  };

  const defineTopScope = obj => {
    obj.true = true;
    obj.false = false;
    for (let op of ["+", "-", "*", "/", "%", "=", "<", ">", "<=", ">=", "!="]) {
      obj[op] = Function(
        "a, b",
        `
        if (arguments.length !== 2)
          throw new SyntaxError("Operator applications only accept 2 arguments");
        const res = a ${op === "=" ? "===" : op} b;
        return res ? res : res === 0 ? res : false;
        `
      );
    }
    return obj;
  };

  return {
    specialForms: defineSpecialForms(Object.create(null)),
    topScope: defineTopScope(Object.create(null)),
  };
})();

export default Enviroment;
