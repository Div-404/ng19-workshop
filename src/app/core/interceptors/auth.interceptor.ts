import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) =>
{
    const auth = inject(AuthService);
    const router = inject(Router);

    const sessionRaw = localStorage.getItem('session') as string;
    const token = sessionRaw ? (JSON.parse(sessionRaw) as {token:string}).token:null;
    // console.log('T1', (JSON.parse(sessionRaw) as {token:string}) );
    // console.log('T2', (JSON.parse(sessionRaw) as {token:string}).token );
    //clone request with header if token exists
    console.log('req', req );
    
    const authReq = token
    ? req.clone({setHeaders: { Authorization: `Bearer ${token}`}})
    : req
    // console.log('authReq', authReq );
    return next(authReq).pipe(
        catchError(err => {
            if(err.status === 401){
                auth.logout();
                router.navigate(['/login']);
            }
            return throwError(()=> err);
        })
    )
}