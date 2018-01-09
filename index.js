var nanobus = require("nanobus");

var defaultOptions = {
  preventDefault: true
}

module.exports = function(opts) {
  opts = Object.assign(defaultOptions, opts)

  var bus = nanobus("clicker");

  window.addEventListener("keydown", keyDown);

  return bus

  function keyDown(event) {
    switch (event.keyCode) {
      case 8: // bckspc
      case 33: // pg up
      case 37: // left arr
        if (opts.preventDefault) event.preventDefault();
        bus.emit("prev", event);
        break;
      case 32: // space
      case 34: // pg dwn
      case 39: // right arr
        if (opts.preventDefault) event.preventDefault();
        bus.emit("next", event);
        break;
      default:
        break;
    }
  }
}
