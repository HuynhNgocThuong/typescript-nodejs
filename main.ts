import { IncomingHttpHeaders, request } from 'http';
import { RequestOptions } from 'https';
import  FormData from 'form-data';
import { createReadStream, createWriteStream } from 'fs';
// const fileStream = createWriteStream('./file.txt');
 
// const req = request(
//   {
//     host: 'jsonplaceholder.typicode.com',
//     path: '/todos/1',
//     method: 'GET',
//   },
//   response => {
//     response.pipe(fileStream);
//   }
// );
 
// req.end();
interface Response {
  data: object,
  headers: IncomingHttpHeaders
}
function performRequest(options: RequestOptions){
  return new Promise((resolve, reject)=>{
    request(options,       
      function(response) {
      const { statusCode, headers } = response;
      if (statusCode as number >= 300) {
        reject(
          new Error(response.statusMessage as string)
        )
      }
      const chunks: any = [];
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        const data = Buffer.concat(chunks).toString();
          const result: Response = {
            data: JSON.parse(data),
            headers,
          };
          resolve(result);
      });
    }
  ).end();
  });
}

performRequest(
  {
    host: 'jsonplaceholder.typicode.com',
    path: '/todos/1',
    method: 'GET',
  },
)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });


const readStream = createReadStream('./photo.jpg');
 
const form = new FormData();
form.append('photo', readStream);
form.append('firstName', 'Marcin');
form.append('lastName', 'Wanago');
 
const req = request(
  {
    host: 'localhost',
    port: '5000',
    path: '/upload',
    method: 'POST',
    headers: form.getHeaders(),
  },
  response => {
    console.log(response.statusCode); // 200
  }
);
 
form.pipe(req);

// Pipe form into a file and read it
const readStream01 = createReadStream('./photo.jpg');
const writeStream01 = createWriteStream('./file.txt');
 
const form01 = new FormData();
form01.append('photo', readStream01);
form01.append('firstName', 'Marcin');
form01.append('lastName', 'Wanago');
 
console.log(form01.getHeaders());
 
form01.pipe(writeStream01);

