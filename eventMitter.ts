import EventEmitter from 'events';
 
const eventEmitter01 = new EventEmitter();
eventEmitter01.on('event', function() {
  console.log('one');
});
eventEmitter01.on('event', function() {
  console.log('two');
});
eventEmitter01.on('event', function() {
  console.log('three');
});
eventEmitter01.emit('event');

const eventEmitter02 = new EventEmitter();
eventEmitter02.emit('event');
eventEmitter02.on('event', function() {
  console.log('Event occured!'); // not logged into the console
});

// Passing additional data to listeners
const eventEmitter03 = new EventEmitter();
eventEmitter03.on('event', function(data) {
  console.log(data); // { key: value }
//   console.log(this === eventEmitter03); // true
});
eventEmitter03.emit(
  'event',
  {
    key: 'value'
  }
);

const eventEmitter04 = new EventEmitter();
eventEmitter04.on('event', () => {
  console.log(this === eventEmitter04); // false
}); 
eventEmitter04.emit('event');

// Removing listeners
const eventEmitter05 = new EventEmitter();
function listener () {
  console.log('Event occurred!');
}
eventEmitter05.on('event', listener);
eventEmitter05.emit('event'); // Event occurred!
eventEmitter05.removeListener('event', listener);
eventEmitter05.emit('event'); /// Nothing happened

// The synchronous nature of events

const eventEmitter06 = new EventEmitter();

// eventEmitter06.on('event1', () => {
//   console.log('First event here!');
//   eventEmitter06.emit('event2');
// });

// eventEmitter06.on('event2', () => {
//   console.log('Second event here!');
//   eventEmitter06.emit('event3');
// });

// eventEmitter06.on('event3', () => {
//   console.log('Third event here!');
//   eventEmitter06.emit('event1');
// });

// eventEmitter06.emit('event1');

const eventEmitter07 = new EventEmitter();
 
// eventEmitter07.on('event1', () => {
//   setTimeout(() => {
//     console.log('First event here!');
//     eventEmitter07.emit('event2');
//   })
// });
 
// eventEmitter07.on('event2', () => {
//   setTimeout(() => {
//     console.log('Second event here!');
//     eventEmitter07.emit('event3');
//   })
// });
 
// eventEmitter07.on('event3', () => {
//   setTimeout(() => {
//     console.log('Third event here!');
//     eventEmitter07.emit('event1');
//   })
// });
 
// eventEmitter07.emit('event1');

// Handling events just once
class MyEventEmitter extends EventEmitter {
    counter = 0;
  }
   
const eventEmitter08 = new MyEventEmitter();
eventEmitter08.on('event', function () {
    console.log(eventEmitter08.counter++);
});
eventEmitter08.emit('event'); // 0
eventEmitter08.emit('event'); // 1
eventEmitter08.emit('event'); // 2

const eventEmitter09 = new MyEventEmitter();
eventEmitter09.once('event', function () {
    console.log(eventEmitter09.counter++);
});
eventEmitter09.emit('event'); // 0
eventEmitter09.emit('event'); // nothing happens
eventEmitter09.emit('event'); // nothing happens