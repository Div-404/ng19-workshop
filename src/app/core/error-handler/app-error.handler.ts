import { ErrorHandler, inject } from '@angular/core';
import { GlobalErrorService } from '../services/global-error.service';

export class AppErrorHandler implements ErrorHandler {
  private globalError = inject(GlobalErrorService);

  handleError(error: unknown): void {
    console.log("007", error);
    this.globalError.handle(error);
  }
}