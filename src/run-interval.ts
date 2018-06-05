import { Observable } from 'rxjs';
import { filter, map, reduce, take } from 'rxjs/operators';
import { add, isEven, square } from './common';

export const runInterval = (
    source$: Observable<number>
) => source$.pipe(
        take(10),
        filter(isEven),
        map(square),
        reduce(add),
);

