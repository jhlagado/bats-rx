import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { assertDeepEqual } from './common';
import { search$ } from './search-stream';

describe('Search component', () => {

    const resultsA = [
        'rxmarbles.com',
        'https://www.manning.com/books/rxjs-in-action'
    ];

    const resultsB = [
        'https://www.manning.com/books/rxjs-in-action'
    ];

    const searchFn = (term:string) => {
        return of(
            term.toLowerCase() === 'rx' ?
                resultsA :
                term.toLowerCase() === 'rxjs' ?
                    resultsB : []
        );
    };

    it('Should test the search stream with debouncing', () => {

        const searchEvents = '-(ab)-' + '-'.repeat(50) + '-c|';
        const searchValues = {
            a: 'r',
            b: 'rx',
            c: 'rxjs',
        };

        const scheduler = new TestScheduler(assertDeepEqual);
        const source:Observable<any> = scheduler.createHotObservable(searchEvents, searchValues);
        const actual = search$(source, searchFn, '', scheduler);

        const expected = '-'.repeat(50) + '-f------(s|)';

        scheduler.expectObservable(actual).toBe(expected, {
            'f': resultsA,
            's': resultsB
        });
        scheduler.flush();
    });
});