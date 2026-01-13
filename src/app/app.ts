import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  // styleUrl: './app.scss'
  styleUrls: ['./app.scss'] 
})
export class App implements OnInit{
  protected title = 'ng19-workshop';
  count = signal(0);
  double = computed(()=> this.count()*2);
  constructor(){
    effect(()=>{
      console.log("Effect count = ", this.count());
    })
  }
  ngOnInit(){
    setTimeout(()=> this.increment(),200);
  }
  increment(){
    this.count.update(v=>v+1);
    console.log("Increment", this.count());
  }
}
