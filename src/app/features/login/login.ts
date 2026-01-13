import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { JsonDataService } from '../../core/services/json-data.service';
import { User } from '../../shared/models/user';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  }
  users$!: Observable<User[]>;
ngOnInit(): void {
  this.users$ = this.service.getUsers();
}

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}