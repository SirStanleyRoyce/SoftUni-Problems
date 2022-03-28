import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateUrl(endOptions: string[] | undefined): ValidatorFn {
    return function validate(control: AbstractControl): ValidationErrors | null {
        const match = control.value.match(/http[:\/\.\-\_\+\#\?\%a-zA-Z0-9]+/);

        let invalid = (() => {
            if (!match) return true;

            if (endOptions) {
                let isInvalid = false;
                for (const end of endOptions) {
                    if (match[0].endsWith(end)) {
                        return false
                    } else {
                        isInvalid = true;
                    }
                }

                return isInvalid;
            }

            return false;
        })()

        return invalid ? {
            validateUrl: {
                error: `URL must start with http${endOptions ? ' and end with ' + endOptions.join('/') : ''}.`
            }
        } : null
    }
}