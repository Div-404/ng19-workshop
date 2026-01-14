import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  form!:FormGroup;
  // @Input() disabled = false;
  @Output() submitForm = new EventEmitter<any>;
    emailerror$!: Observable<string | null>;
  passworderror$!: Observable<string | null>;
  valid$!: Observable<boolean>;
  constructor(
    private fb:FormBuilder
  ) {
  }

 ngOnInit(): void {
    // 1️⃣ Create form FIRST
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
          )
        ]
      ]
    });

    // 2️⃣ Email errors
    this.emailerror$ = this.form.get('email')!.valueChanges.pipe(
      startWith(this.form.get('email')!.value),
      map(() => {
        const ctrl = this.form.get('email');
        if (ctrl?.hasError('required')) return 'Email is required';
        if (ctrl?.hasError('email')) return 'Invalid email format';
        return null;
      })
    );

    // 3️⃣ Password errors
    this.passworderror$ = this.form.get('password')!.valueChanges.pipe(
      startWith(this.form.get('password')!.value),
      map(() => {
        const ctrl = this.form.get('password');
        if (ctrl?.hasError('required')) return 'Password is required';
        if (ctrl?.hasError('pattern'))
          return 'Min 8 chars, uppercase, lowercase, number & special char';
        return null;
      })
    );

    // 4️⃣ Form validity
    this.valid$ = this.form.statusChanges.pipe(
      startWith(this.form.status),
      map(status => status === 'VALID')
    );
  }
onSubmit(){
  if(this.form.valid){
    this.submitForm.emit(this.form.value)
  }
}


}