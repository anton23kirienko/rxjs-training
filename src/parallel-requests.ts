import { forkJoin, from } from 'rxjs';
import fetch from 'node-fetch';

const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5',
];

const request = (url: string) => from(fetch(url).then((res) => res.json()));

forkJoin(urls.map(request)).subscribe((val) => console.log(val));
