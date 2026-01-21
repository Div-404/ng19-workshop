import { Component, inject, OnInit } from '@angular/core';
import { JsonDataService } from '../../core/services/json-data.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{
  service = inject(JsonDataService);
ngOnInit(): void {
  // this.service.getProtectedData().subscribe({
  //   next: res => console.log('protected', res),
  //   error: err => console.warn('protected err', err)
  // });
}
}
