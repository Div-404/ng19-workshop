import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';
import { GlobalErrorService } from './core/services/global-error.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,ToastComponent],
  standalone: true,
  templateUrl: './app.html',
  // styleUrl: './app.scss'
  styleUrls: ['./app.scss'] 
})
export class App{
  protected title = 'ng19-workshop';
count = signal(0);
  double = computed(() => this.count() * 2);

  public globalError = inject(GlobalErrorService);
  toast = this.globalError.error;

  private toastTimer: any;

  constructor() {

    effect(() => {

      const msg = this.toast();

      if (!msg) return;

      clearTimeout(this.toastTimer);

      this.toastTimer = setTimeout(() => {
        this.globalError.clear();
      }, 3000);

    });

  }

  increment() {
    this.count.update(v => v + 1);
  }

  testError() {
    throw new Error('Toast error working 🚀');
  }

}
