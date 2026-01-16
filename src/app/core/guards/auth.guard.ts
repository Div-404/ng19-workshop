import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const authGuard:CanMatchFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const loggedIn = auth.isLoggedIn();
    console.log("Hey am i logged in", loggedIn);
    if(!loggedIn){
        return router.createUrlTree(['/login']);
    }
    return true;
};
