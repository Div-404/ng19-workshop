// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class GlobalErrorService {
//   private _error = new Subject<string>();
//   error$ = this._error.asObservable();

//   handle(err: any): void {
//     const msg = typeof err === 'string' ? err
//               : err?.error?.message || err?.message || 'Unknown error';
//     this._error.next(msg);
//     console.error('[GlobalError]', err);
//   }
// }

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalErrorService {

  private _error = signal<string | null>(null);

  readonly error = this._error.asReadonly();

  handle(err: any): void {
    console.log("err", err);
    const msg =
      typeof err === 'string'
        ? err
        : err?.error?.message || err?.message || 'Unknown error';

    this._error.set(msg);

    // console.error('[GlobalError]', err);
  }

  clear() {
    this._error.set(null);
  }
}

