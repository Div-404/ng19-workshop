import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../shared/ui/form-field/form-field';

export interface LoginPayload {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './login-form.html',
  styleUrls:['./login-form.scss']
})
export class LoginForm {
  @Output() submitForm = new EventEmitter<LoginPayload>();
  form!: FormGroup;
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value as LoginPayload);
    }
  }
}