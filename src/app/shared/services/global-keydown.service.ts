import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GlobalKeydownService {
    keydownEvents$: Observable<string>;

    constructor() {
        this.keydownEvents$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
            filter((event) => !(event.target instanceof HTMLInputElement)),
            map((event) => event.key)
        );
    }
}
