import * as fs from 'fs';
import { Readable } from 'stream';

const stream01 = fs.createReadStream('./file.txt',{
    encoding: 'utf-8'
  });
 
  stream01.on('data', (chunk) => {
  console.log('New chunk of data:', chunk);
})

// Readable stream under the hood
const stream02 = new Readable();
stream02.push('Hello');
stream02.push('World!');
stream02.push(null);
stream02.on('data', (chunk) => {
  console.log(chunk.toString());
});

// read function and the ‘readable’ event
const stream03 = new Readable();
 
const read = stream03.read.bind(stream03);
stream03.read = function() {
  console.log('read() called');
  return read();
}
 
stream03.push('Hello');
stream03.push('World!');
stream03.push(null);
 
stream03.on('data', (chunk) => {
  console.log(chunk);
});

const stream04 = new Readable();
 
stream04.push('Hello');
stream04.push('World!');
stream04.push(null);
 
stream04.on('readable', () => {
  let data;
  while (null !== (data = stream04.read())) {
    console.log('Received:', data.toString());
  }
});