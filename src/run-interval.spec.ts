import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { assertDeepEqual } from './common';
import { runInterval } from './run-interval';

test('should square and add even numbers, use marbles', () => {

    const scheduler = new TestScheduler(assertDeepEqual);
    const source = scheduler.createColdObservable(
        '1-2-3-4-5-6-7-8-9|'
    );
    const actual = runInterval(source as Observable<any>);
    const expected = '-----------------(a|)';
    scheduler.expectObservable(actual).toBe(expected, {
        a: 120,
    });
    scheduler.flush();
});
