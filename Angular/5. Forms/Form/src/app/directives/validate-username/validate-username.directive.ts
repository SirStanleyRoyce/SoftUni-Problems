import { Directive } from '@angular/core';
import { AbstractControl, NgForm, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[ngModel][appValidateUsername]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateUsernameDirective,
      multi: true
    }
  ]
})
export class ValidateUsernameDirective {
  validate(control: AbstractControl): ValidationErrors | null {
    let invalid = false;
    const [fName, sName, ...args] = control.value.split(" ");

    if (args.length > 0)
      invalid = true;

    if (!fName || !sName)
      invalid = true;

    const match = `${fName} ${sName}`.match(/[A-Z][a-zA-Z]*\ [A-Z][a-zA-Z]*/);
    if (!match || match[0] !== `${fName} ${sName}`)
      invalid = true;

    return invalid ? {
      validUsername: { error: 'Name must consist of 2 words separated by a space. Both should start with a capital letter.' }
    } : null
  }
}