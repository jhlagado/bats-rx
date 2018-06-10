import { Observable, SchedulerLike } from 'rxjs';
import { concatMap, debounceTime, filter, map, tap } from 'rxjs/operators';
import { notEmpty } from './common';

export const search$ = (
    source$: Observable<string>,
    fetchResult: (term:string) => Observable<string[]>,
    url = '',
    scheduler?: SchedulerLike
) => source$.pipe(
    debounceTime(500, scheduler),
    filter(notEmpty),
    tap((term: string) => console.log(`Searching with term ${term}`)),
    map((query) => url + query),
    concatMap(fetchResult)
);

