function copy() {
    let textarea = document.getElementById("message");
    textarea.select();
    document.execCommand("copy");
  }
  