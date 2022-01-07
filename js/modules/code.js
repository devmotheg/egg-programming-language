/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

const Code = (_ => {
  const $editorCode = document.querySelector(".editor__code");

  const listeners = _ => {
    const indent = tabs => "\t".repeat(tabs);

    const getTabs = (text, pos) => {
      let tabs = 0;
      while (text[pos] !== "\n" && pos >= 0) pos--;
      pos++;
      while (text[pos++] === "\t") tabs++;
      return tabs;
    };

    const getBlockInfo = (text, pos, tabs) => {
      let inBlock = false;
      let opened = 0,
        closed = 0;
      while (text[pos] !== "\n" && pos >= 0) {
        if (text[pos] === "(") opened++;
        else if (text[pos] === ")") closed++;
        pos--;
      }
      if (opened > closed) inBlock = true;
      const blockEnd = inBlock ? `\n${indent(tabs)}` : "";
      return {
        inBlock,
        blockEnd,
      };
    };

    $editorCode.addEventListener("keydown", function (e) {
      const start = this.selectionStart,
        end = this.selectionEnd;
      const textBegin = this.value.substr(0, start),
        textEnd = this.value.substr(end);
      switch (e.key) {
        case "Tab":
          e.preventDefault();
          if (start === end) {
            this.value = `${textBegin}\t${textEnd}`;
            this.selectionStart = start + 1;
            this.selectionEnd = end + 1;
          } else {
            const lines = this.value.split("\n");
            for (let i = 0; i < lines.length; i++) lines[i] = `\t${lines[i]}`;
            this.value = lines.join("\n");
            this.selectionStart = start;
            this.selectionEnd = end + lines.length;
          }
          break;
        case "Enter":
          e.preventDefault();
          let pos = start - 1,
            tabs = getTabs(this.value, pos);
          const { inBlock, blockEnd } = getBlockInfo(this.value, pos, tabs);
          tabs += inBlock;
          this.value = `${textBegin}\n${indent(tabs)}${blockEnd}${textEnd}`;
          this.selectionStart = start + tabs + 1;
          this.selectionEnd = end + tabs + 1;
          break;
        case "(":
          e.preventDefault();
          this.value = `${textBegin}()${textEnd}`;
          this.selectionStart = start + 1;
          this.selectionEnd = end + 1;
          break;
        case ")":
          if (this.value[start] === ")") {
            e.preventDefault();
            this.selectionStart = start + 1;
            this.selectionEnd = end + 1;
          }
          break;
      }
    });
  };

  const init = _ => {
    listeners();
  };

  return {
    init,
  };
})();

export default Code;
