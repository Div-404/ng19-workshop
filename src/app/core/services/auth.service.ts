import { Injectable, signal } from "@angular/core";
import { User } from "../../shared/models/user";
import { HttpClient } from "@angular/common/http";
import { Session } from "../../shared/models/session";
import { catchError, map, of, tap, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService{
    private readonly api = 'http://localhost:3000';

    // -------------signals------------
    isLoggedIn = signal(false);
    currentUser = signal<User|null>(null);

    constructor(private http:HttpClient){
        this.init();
    }

    private init(){
        const raw =  localStorage.getItem('session');
        if(raw){
            try{
                const session:Session = JSON.parse(raw);
                if(new Date(session.expires)> new Date()){
                    this.http.get<User>(`${this.api}/users/${session.userId}`)
                    .subscribe(user=>{
                        this.isLoggedIn.set(true);
                        this.currentUser.set(user);
                    });
                } else{
                    this.logout();
                }
            }
            catch{
                    this.logout();

            }
        }
    }
    logout(){
        localStorage.removeItem('session');
        this.isLoggedIn.set(false);
        this.currentUser.set(null);
    }
    login(email: string, password: string) {

  return this.http
    .get<User[]>(`${this.api}/users?email=${email}&password=${password}`)
    .pipe(

      map(users => users[0]),

      tap(user => {
        if (!user) throw new Error('Invalid Credentials');

        const session: Session = {
          userId: user.id!,
          token: this.fakeJwt(),
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };

        localStorage.setItem('session', JSON.stringify(session));

        this.isLoggedIn.set(true);
        this.currentUser.set(user);
      }),

      map(() => true),

      catchError(err => {
        this.logout();

        // ✅ IMPORTANT: rethrow error
        return throwError(() => err);
      })

    );
}

    fakeJwt(){
        return 'fake-jwt-' + Math.random().toString(36).slice(2);
    }
}