/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import Runner from "../egg-lang/runner.js";
import Log from "./log.js";

const Buttons = (_ => {
  const $editorCode = document.querySelector(".editor__code"),
    $editorLog = document.querySelector(".editor__log"),
    $execute = document.querySelector(".execute"),
    $clear = document.querySelector(".clear");

  const listeners = _ => {
    $execute.addEventListener("click", _ => {
      try {
        Runner.run($editorCode.value);
      } catch (err) {
        Log.display("error", err);
      }
    });

    $clear.addEventListener("click", _ => ($editorLog.innerHTML = ""));
  };

  const init = _ => {
    listeners();
  };

  return {
    init,
  };
})();

export default Buttons;
