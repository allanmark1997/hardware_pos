  
// document.addEventListener('contextmenu', event => event.preventDefault());
  
  document.onkeydown = (e) => {
    if (e.key == "F12" || e.key == 123) {
      e.preventDefault();
    }
      if (e.key == "F5" || e.key == 116) {
        e.preventDefault();
      }
    if (e.ctrlKey && e.shiftKey && e.key == "I") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "C") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "J") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key == "U") {
      e.preventDefault();
    }
  };