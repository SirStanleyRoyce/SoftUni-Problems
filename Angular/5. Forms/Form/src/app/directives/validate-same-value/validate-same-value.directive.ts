import { Directive, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgForm, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { validateSameValue } from './validate-same-value-fn';

@Directive({
  selector: '[ngModel][appSameValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateSameValueDirective,
      multi: true
    }
  ]
})
export class ValidateSameValueDirective implements OnDestroy {
  @Input() appSameValue: string = '';
  private subscription: Subscription | undefined;
  constructor(private form: NgForm) { }

  validate(control: AbstractControl): ValidationErrors | null {
    const otherControl = this.form.controls[this.appSameValue];

    if (this.subscription) this.subscription.unsubscribe();

    otherControl.valueChanges.subscribe(() => {
      control.updateValueAndValidity({ onlySelf: true });
    })
    return validateSameValue(otherControl)(control);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}