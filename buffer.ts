import { StringDecoder } from 'string_decoder';
// The buffer is an array of numbers
const buffer01 = new Buffer(5);
 
buffer01[0] = 255;
console.log(buffer01[0]); // 255
 
buffer01[1] = 256;
console.log(buffer01[1]); // 0
 
buffer01[2] = 260;
console.log(buffer01[2]); // 4
console.log(buffer01[2] === 260%256); // true
 
buffer01[3] = 516;
console.log(buffer01[3]); // 4
console.log(buffer01[3] === 516%256); // true
 
buffer01[4] = -50;
console.log(buffer01[4]); // 206

//String Buffers
const buffer02 = Buffer.from('Hello world!');
console.log(buffer02.toString()); // Hello world!
const decoder = new StringDecoder('utf8');
const buffers = [
    Buffer.from('Hello '),
    Buffer.from([0b11110000, 0b10011111]),
    Buffer.from([0b10001100, 0b10001110]),
    Buffer.from(' world!'),
  ];

const result = buffers.reduce((result, buffer) => (
    `${result}${decoder.write(buffer)}`
  ), '');
   
  console.log(result); // Hello 🌎 world!