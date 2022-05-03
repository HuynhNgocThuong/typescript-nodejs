import * as fs from 'fs';
import * as util from 'util'
import { Writable } from 'stream';
const stream01 = fs.createWriteStream('./file01.txt');
 
stream01.write('Hello world!', () => {
  console.log('File created!');
});

const stream02 = fs.createWriteStream('./file02.txt');
 
stream02.on('finish', () => {
  console.log('All the data is transmitted');
});
 
stream02.write('Hello ');
stream02.write('world!')

// Pipes
const readable = fs.createReadStream('./file01.txt');
const writable = fs.createWriteStream('./file02.txt');
 
writable.on('finish', () => {
  console.log('The end!');
});
 
readable.pipe(writable);

// Writable stream under the hood
const writable01 = new Writable();
 
writable01._write = function(chunk, encoding, next) {
  console.log(chunk.toString());
  next();
};
 
writable01.write('Hello world!');


const writeFile = util.promisify(fs.writeFile);
 
class WritableFileStream extends Writable {
  path: string;
 
  constructor(path: string) {
    super();
    this.path = path;
  }
 
  _write(chunk: any, encoding: string, next: (error?: Error) => void) {
    writeFile(this.path, chunk)
      .then(() => next())
      .catch((error) => next(error));
  }
}
 
const readable02 = fs.createReadStream('./file03.txt');
const writable02 = new WritableFileStream('./file04.txt');
 
readable02.pipe(writable02);