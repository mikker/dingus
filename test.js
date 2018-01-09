var tape = require("tape");
var Dingus = require("./");

tape("dingus", function(t) {
  t.test("adds event listener on window", function(t) {
    t.plan(2);

    var mockWindow = new MockWindow();
    var dingus = new Dingus({}, mockWindow);
    dingus.on(Dingus.PREV, (event, action) => {
      t.equal(event.constructor, MockEvent);
      t.equal(action, Dingus.PREV);
    });
    mockWindow.fireKeyCode(8);
  });

  t.test("prevents default", function(t) {
    t.plan(1);

    var mockWindow = new MockWindow();
    var dingus = new Dingus({}, mockWindow);
    dingus.on(Dingus.PREV, event => {
      t.true(event.prevented);
    });
    mockWindow.fireKeyCode(8);
  });

  t.test('removes event listener', t => {
    t.plan(2)

    var mockWindow = new MockWindow();
    var dingus = new Dingus({}, mockWindow);

    t.equal(mockWindow.listeners.length, 1)

    dingus.destroy()

    t.equal(mockWindow.listeners.length, 0)
  })
});

function MockEvent(keyCode) {
  this.keyCode = keyCode;
  this.prevented = false;
}

MockEvent.prototype.preventDefault = function() {
  this.prevented = true;
};

function MockWindow() {
  this.listeners = [];
}

MockWindow.prototype.addEventListener = function(_event, cb) {
  this.listeners.push(cb);
};

MockWindow.prototype.removeEventListener = function(_event, cb) {
  this.listeners = []
}

MockWindow.prototype.fireKeyCode = function(keyCode) {
  this.listeners.forEach(l => l(new MockEvent(keyCode)));
};
