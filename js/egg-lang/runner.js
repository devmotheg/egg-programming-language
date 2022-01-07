/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import Parser from "./parser.js";
import Interpreter from "./interpreter.js";
import Enviroment from "./enviroment.js";

const Runner = (_ => {
  const run = program =>
    Interpreter.evaluate(
      Parser.parse(program),
      Object.create(Enviroment.topScope)
    );

  return {
    run,
  };
})();

export default Runner;
