<h2 align='center'><img src='https://s3.brnbw.com/r400-gallery-6FIvjLm7JI.png' width='77' /><br />dingus</h2>

**dingus** listens to and emits presentation related keyboard events eg. `[<-]`, `[->]`, `[space]` or the buttons on one of those wireless presenter dinguses.

## Usage

```js
var Dingus = require('dingus')
var dingus = new Dingus({ preventDefault: true });

// Listen to specific events (PREV, NEXT, START_STOP, BLANK_SCREEN)
dingus.on(Dingus.PREV, function(event, eventName) {
  // err'body to the left
});

// Or listen to all of them
dingus.on('*', cb);

// remove it again with
dingus.off('*', cb);

function cb(event, eventName) {
  // event.preventDefault() etc, etc
  // eventName === Dingus.PREV etc, etc
}

// remove `keydown` listener from window
dingus.destroy();
```

## License

MIT
