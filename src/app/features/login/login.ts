import { ChangeDetectionStrategy, Component, computed, OnDestroy, OnInit } from '@angular/core';
import { JsonDataService } from '../../core/services/json-data.service';
import { User } from '../../shared/models/user';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule, ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login implements OnInit {
  // users: User[] = [];
  users:any;
  loading:any;
  users$!: Observable<User[]>;

  // private sub = new Subscription();
  constructor(private service: JsonDataService) {
    // this.sub.add(
      //   this.service.getUsers().subscribe({
    //     next: (data) => {
    //       this.users = data;
    //       console.log('[Login] users', data);
    //     },
    //     error: (err) => console.error(err)
    //   })
    // );
     this.users = toSignal(this.service.getUsers(),{initialValue:[]})
  this.loading = computed(()=> this.users.length == 0)
  }

ngOnInit(): void {
//   // this.users$ = this.service.getUsers();
//   this.users = toSignal(this.service.getUsers(),{initialValue:[]})
//   this.loading = computed(()=> this.users.length == 0)
}

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}