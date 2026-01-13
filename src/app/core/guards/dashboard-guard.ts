import { CanLoadFn } from '@angular/router';

export const dashboardGuard: CanLoadFn = () => {
  console.log('[guard] dashboard – always allow (stub)');
  return true;
};