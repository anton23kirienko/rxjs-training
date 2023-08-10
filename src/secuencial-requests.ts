import { from, tap, switchMap, expand, take, concatAll } from 'rxjs';
import fetch from 'node-fetch';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const request = (url: string) => from(fetch(url).then((res) => res.json()));

const logValue = (prefix: string) => (message?: any) =>
  console.log(prefix, message);

const url = 'https://jsonplaceholder.typicode.com/todos';

// solution 1
const obs1 = request(`${url}/1`).pipe(
  switchMap((response: Todo) => request(`${url}/${response.id + 1}`)),
  tap(logValue('switchMap value: ')),
  switchMap((response: Todo) => request(`${url}/${response.id + 1}`)),
  tap(logValue('switchMap value: ')),
  switchMap((response: Todo) => request(`${url}/${response.id + 1}`)),
  tap(logValue('switchMap value: ')),
  switchMap((response: Todo) => request(`${url}/${response.id + 1}`)),
  tap(logValue('switchMap value: '))
);

// solution 2
const obs2 = request(`${url}/1`).pipe(
  expand((response: Todo) => request(`${url}/${response.id + 1}`)),
  tap(logValue('expand value: ')),
  take(5)
);

from([obs1, obs2]).pipe(concatAll()).subscribe(logValue('Subscribe value: '));
