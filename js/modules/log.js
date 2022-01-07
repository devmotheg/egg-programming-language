/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

const Log = (_ => {
  const $edtiorLog = document.querySelector(".editor__log");

  const display = (type, msg) => {
    if (type === "error")
      $edtiorLog.innerHTML += `<p class="log-error">${msg}</p>`;
    else $edtiorLog.innerHTML += `<p class="log-byte">${msg}</p>`;
  };

  return {
    display,
  };
})();

export default Log;
