var nanobus = require("nanobus");

module.exports = Dingus;

var defaultOptions = {
  preventDefault: true
};

function Dingus(options, w) {
  w = w || window

  this.options = Object.assign({}, defaultOptions, options);
  this._bus = nanobus("dingus");
  this._w = w;

  w.addEventListener("keydown", this._keyDown.bind(this));
}

Dingus.prototype.on = function(action, cb) {
  this._bus.on(action, cb);
};

Dingus.prototype.off = function(action, cb) {
  this._bus.removeListener(action, cb);
};

Dingus.prototype.destroy = function() {
  this._bus.removeAllListeners();
  this._w.removeEventListener("keydown", this._keyDown);
};

Dingus.prototype._keyDown = function(event) {
  const action = keysToEvents[event.keyCode];

  if (!action) return;

  if (this.options.preventDefault) {
    event.preventDefault();
  }

  this._bus.emit(action, event, action);
};

Dingus.PREV = "prev";
Dingus.NEXT = "next";
Dingus.START_STOP = "start-stop";
Dingus.BLANK_SCREEN = "blank-screen";

var keysToEvents = {
  8: Dingus.PREV, // backspace
  33: Dingus.PREV, // pg up
  37: Dingus.PREV, // left arrow

  32: Dingus.NEXT, // space
  34: Dingus.NEXT, // pg down
  39: Dingus.NEXT, // right arrow

  27: Dingus.START_STOP, // Esc
  116: Dingus.START_STOP, // F5

  190: Dingus.BLANK_SCREEN // period (.)
};
