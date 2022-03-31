import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[invalidWhitespace]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateWhitespaceDirective,
      multi: true
    }
  ]
})
export class ValidateWhitespaceDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    return control.value !== control.value?.trim() ? { invalidWhitespace: { error: 'Field cannot start or end with whitespace' } } : null;
  }
}
