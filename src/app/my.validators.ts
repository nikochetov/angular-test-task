import {AbstractControl} from '@angular/forms';

// export class MyValidators {
export function validateSNILS(control: AbstractControl): any {
    let num: any = control.value;

    // Цифр всегда 11
    // if (num.length != 11) {
    //   return { invalid: true };
    // }
    if (num.length === 11) {
      num = num.replace(/\D/g, '');
      if (/(\d)\1\1/.test(num)) {
        return { invalid: true };
      }

      const controlCode = Number(num.substr(-2));
      let calcCode = num.substr(0, 9).split('')
        .map((N, idx) => Number(N) * (9 - idx))
        .reduce((Sum, N) => Sum + N);
      if (calcCode == 100) calcCode = 0;
      if (calcCode % 101 != controlCode) {
        return { invalid: true };
      }
      return null;
    }

    return null;
  }
// }
