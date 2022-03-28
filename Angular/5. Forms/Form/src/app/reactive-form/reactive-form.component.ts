import { Component, } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { validateSameValue } from '../directives/validate-same-value/validate-same-value-fn';
import { validateUrl } from '../directives/validate-url/validate-url-fn';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  passwordValidators: ValidatorFn[] = [Validators.required, Validators.minLength(3), Validators.maxLength(16), Validators.pattern(/[0-9a-zA-Z]+/)]
  form = this.fb.group({
    username: ['', [Validators.required, Validators.pattern(/[A-Z][a-zA-Z]*\ [A-Z][a-zA-Z]*/)]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/[0-9]+/)]],
    occupation: [''],
    imageUrl: [''],
    password: ['', this.passwordValidators],
    repassword: ['', this.passwordValidators]
  })
  subscription: Subscription;
  constructor(private fb: FormBuilder) {
    console.log(this.form)
    this.subscription = this.form.get('password')!.valueChanges.subscribe(() =>
      this.form.get('repassword')!.updateValueAndValidity({ onlySelf: true })
    )

    this.form.get('repassword')?.setValidators([validateSameValue(this.form.get('password')!), ...this.passwordValidators]);
    this.form.get('imageUrl')?.setValidators(validateUrl(['jpg', 'png']));
  }

  tels = [
    { value: 359 },
    { value: 444 },
    { value: 971 },
    { value: 111 },
    {
      value: 888,
      default: true
    },
    { value: 392 },
    { value: 152 }
  ]
  occupations = [
    {
      value: 'Not specified',
      default: true
    },
    { value: 'Student' },
    { value: 'Worker' },
    { value: 'Designer' },
    { value: 'Programmer' },
    { value: 'Entrepreneur' },
    { value: 'None' }
  ]

  submitHandler(): void {
    if (this.form.valid)
      this.form.reset();
  }
}
