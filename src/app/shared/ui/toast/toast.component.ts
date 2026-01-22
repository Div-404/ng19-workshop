// import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, Input, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-toast',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="toast" *ngIf="message">
//       <span>{{ message }}</span>
//       <button (click)="close.emit()">×</button>
//     </div>
//   `,
//   styleUrls: ['./toast.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class ToastComponent {
// //   @Input() message = '';
// //   @Output() close = new EventEmitter<void>();
// //   constructor(){
// //     this.closeit();
// //   }
// //   closeit(){
// //     setTimeout(() => {
// //         this.close.emit()
// //     }, 1000);
// //   }
//   message = input<string>('');
//   close = new EventEmitter<void>();

//   constructor() {

//     effect(() => {

//       if (this.message()) {

//         setTimeout(() => {
//           this.close.emit();
//         }, 3000);

//       }

//     });

//   }
// }

import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  input,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="message()">
      <span>{{ message() }}</span>
      <button (click)="close.emit()">×</button>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {

  message = input<string>('');
  close = new EventEmitter<void>();

//   private timerId: any;

//   constructor() {

//     effect(() => {

//       const msg = this.message();

//       if (!msg) return;

//       // ✅ clear previous timer
//       clearTimeout(this.timerId);

//       this.timerId = setTimeout(() => {
//         this.close.emit();
//       }, 3000);

//     });

//   }

//   ngOnDestroy() {
//     clearTimeout(this.timerId);
//   }
}
