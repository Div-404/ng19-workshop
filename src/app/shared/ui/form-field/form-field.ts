import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  standalone: true,
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>FormFieldComponent),
      multi: true
    }
  ]
})
export class FormFieldComponent {
@Input() label='';
@Input() type: 'text'| 'email'|'password' ='text';
@Input() errors: {key:string;message:string}[] = [];
value = signal('');
disabled = signal(false);
touched = signal(false);

onChange = (v:string) =>{};
onTouched = ()=>{};

//CVA methods
writeValue(v:string|null):void{
  this.value.set(v ?? '');
  console.log("this.value", this.value);
}
registerOnChange(fn:any){
  this.onChange = fn;
  console.log("this.onChange", this.onChange);
}
registerOnTouched(fn:any){
  this.onTouched = fn;
  console.log("this.onChange", this.onChange);
}
setDisabledState(isDisabled:boolean){
  this.disabled.set(isDisabled);
  console.log("this.disabled", this.disabled);
}
update(val:string){
  this.value?.set(val);
  this.onChange(val);
}
blur(): void {
    this.touched.set(true);
    this.onTouched();
  }
}
