import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { dashboardGuard } from './core/guards/dashboard-guard';
import { authGuard } from './core/guards/auth.guard';

// export const routes: Routes = [];

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./features/login/login').then(m=>m.Login) },
  { path: 'signup', loadComponent: () => import('./features/signup/signup').then(m=>m.Signup) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m=>m.Dashboard),
    canMatch: [authGuard], }

];