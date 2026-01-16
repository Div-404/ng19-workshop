import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { JsonDataService } from '../../core/services/json-data.service';
import { User } from '../../shared/models/user';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoginForm, LoginPayload } from '../login-form/login-form';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule, LoginForm],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  // users: User[] = [];
//   users:any;
//   loading:any;
//   users$!: Observable<User[]>;

//   // private sub = new Subscription();
//   constructor(private service: JsonDataService,
    
//   ) {
//     // this.sub.add(
//       //   this.service.getUsers().subscribe({
//     //     next: (data) => {
//     //       this.users = data;
//     //       console.log('[Login] users', data);
//     //     },
//     //     error: (err) => console.error(err)
//     //   })
//     // );
//      this.users = toSignal(this.service.getUsers(),{initialValue:[]})
//   this.loading = computed(()=> this.users.length == 0)
//   }

// ngOnInit(): void {
// //   // this.users$ = this.service.getUsers();
// //   this.users = toSignal(this.service.getUsers(),{initialValue:[]})
// //   this.loading = computed(()=> this.users.length == 0)
// }

// onLogin(payload: any): void {
//     console.log('[LoginPage] payload', payload);
//     // TODO: authenticate in next segments
//   }
  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
    public auth = inject(AuthService);
  private router = inject(Router);

  users = toSignal(inject(JsonDataService).getUsers(), { initialValue: [] });

  onLogin(payload: LoginPayload): void {
    this.auth.login(payload.email, payload.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
  
}