import { Notification, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';
import { assertDeepEqual, square } from './common';
import { runInterval } from './run-interval';

test('Create time from marble diagram', () => {
    const scheduler = new TestScheduler(assertDeepEqual);
    const time = scheduler.createTime('-----|');
    expect(time).toEqual(50);
});

test('Should parse a marble string into a series of notifications', () => {
    const result = TestScheduler.parseMarbles(
        '--a---b---|',
        { a: 'A', b: 'B', c: 'C' }
    );
    expect(result).toEqual([
        { frame: 20, notification: Notification.createNext('A') },
        { frame: 60, notification: Notification.createNext('B') },
        { frame: 100, notification: Notification.createComplete() },
    ]);
});

test('map operator should map multiple values', () => {
    const scheduler = new TestScheduler(assertDeepEqual);
    const source = scheduler.createColdObservable(
        '--1--2--3--4--5--6--7--8--9--|'
    );
    const expected = '--a--b--c--d--e--f--g--h--i--|';
    const r = source.pipe(map(square));
    scheduler.expectObservable(r).toBe(expected, {
        a: 1, b: 4, c: 9, d: 16, e: 25, f: 36, g: 49, h: 64, i: 81,
    });
    scheduler.flush();
});

describe('Marble test with debounceTime', () => {
    it('Should delay all element by the specified time', () => {
        const scheduler = new TestScheduler(assertDeepEqual);

        const source = scheduler.createHotObservable(
            '-a--------b------c----|'
        );

        const expected = '------a--------b------(c|)';

        const r = source.pipe(
            debounceTime(50, scheduler)
        );
        scheduler.expectObservable(r).toBe(expected);
        scheduler.flush();
    });
});

it('Should square and add even numbers', () => {
    const scheduler = new TestScheduler(assertDeepEqual);

    const source:Observable<number> = scheduler.createColdObservable(
        '-1-2-3-4-5-6-7-8-9-|'
    );

    const expected = '-------------------(s-|';

    const r = runInterval(source);

    scheduler.expectObservable(r).toBe(expected, { 's': 120 });

    scheduler.flush();
});