import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';
import { validateUrl } from './validate-url-fn';

@Directive({
  selector: '[ngModel][appValidateUrl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateUrlDirective,
      multi: true
    }
  ]
})
export class ValidateUrlDirective {
  @Input() appValidateUrl: string[] | undefined; //OPTIONS WHAT THE URL SHOULD END WITH 

  validate(control: AbstractControl): ValidationErrors | null {
    return validateUrl(this.appValidateUrl)(control);
  }
}
