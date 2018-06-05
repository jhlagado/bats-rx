import { range } from 'rxjs';
import { asyncScheduler } from 'rxjs';
import { tap } from 'rxjs/operators';

test('Emits values synchronously on default', done => {
  const temp: number[] = [];
  const push = (value: number) => temp.push(value);
  range(1, 5, asyncScheduler)
    .pipe(tap(push))
    .subscribe(
      value => {
        expect(temp.length).toEqual(value);
        expect(temp).toContain(value);
      },
      done,
      done
    );
});
