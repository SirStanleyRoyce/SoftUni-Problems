import { Directive, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgForm, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[sameValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateSameValueDirective,
      multi: true
    }
  ]
})
export class ValidateSameValueDirective implements OnDestroy {
  @Input() sameValue!: string; // other control name (repeat password --> password)
  otherControl!: AbstractControl;
  subscription: Subscription | undefined;

  constructor(private form: NgForm) { }

  validate(control: AbstractControl): ValidationErrors | null {
    this.otherControl = this.form.controls[this.sameValue];

    let invalid = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    };

    this.subscription = this.otherControl.valueChanges.subscribe(() =>
      control.updateValueAndValidity({ onlySelf: true })
    );

    if (control.value?.trim() !== this.otherControl.value?.trim()) invalid = true;

    return invalid ? { sameValue: {} } : null
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}