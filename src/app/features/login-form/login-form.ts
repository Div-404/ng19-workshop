import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  form!:FormGroup;
  @Input() disabled = false;
  @Output() submitForm = new EventEmitter<any>;
  constructor(
    private fb:FormBuilder
  ) {
  }

ngOnInit(): void {
  this.form = this.fb.group({
          email:['',[Validators.required, Validators.email]],
          // password: ['',
          //   [
          // Validators.required, 
          //   Validators.pattern(
          // ^(?=.*[a-z])(?=.*[A-Z])
          //   (?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$)]]
          password: [
    '',
    [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
      )
    ]
  ]
  })
}

onSubmit(){
  if(this.form.valid){
    this.submitForm.emit(this.form.value)
  }
}


}