import { AbstractControl, ValidatorFn } from '@angular/forms';

// Fonction de validation personnalisée
export function passwordMatchValidator(controlName1: string, controlName2: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const passwordControl = control.get(controlName1);
    const confirmPasswordControl = control.get(controlName2);

    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
