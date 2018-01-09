var nanobus = require("nanobus");

module.exports = dingus;

function dingus(opts) {
  opts = Object.assign(defaultOptions, opts);

  var bus = nanobus("dingus");

  window.addEventListener("keydown", keyDown);

  bus.removeListener = function() {
    window.removeEventListener("keydown", keyDown);
  };

  return bus;

  function keyDown(event) {
    const eventName = keysToEvents[event.keyCode];

    if (!eventName) return;

    if (opts.preventDefault) event.preventDefault();

    bus.emit(eventName, event);
  }
}

dingus.PREV = "prev";
dingus.NEXT = "next";
dingus.START_STOP = "start-stop";
dingus.BLANK_SCREEN = "blank-screen";

var defaultOptions = {
  preventDefault: true
};

var keysToEvents = {
  8: dingus.PREV, // backspace
  33: dingus.PREV, // pg up
  37: dingus.PREV, // left arrow

  32: dingus.NEXT, // space
  34: dingus.NEXT, // pg down
  39: dingus.NEXT, // right arrow

  116: dingus.START_STOP, // F5

  190: dingus.BLANK_SCREEN // period (.)
};
