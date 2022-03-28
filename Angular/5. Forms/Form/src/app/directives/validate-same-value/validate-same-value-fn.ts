import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateSameValue(otherControl: AbstractControl): ValidatorFn {
    return function validate(control: AbstractControl): ValidationErrors | null {
        let invalid = false;

        if (control.value !== otherControl.value) invalid = true;

        return invalid ? {
            sameValue: {}
        } : null
    }
}