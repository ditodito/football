import { Directive, Input } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MustMatch } from '../utils/must-match.validator';

@Directive({
  selector: '[mustMatch]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true },
  ],
})
export class MustMatchDirective implements Validator {
  @Input('mustMatch') mustMatch: string[] = [];
  constructor() {}

  validate(formGroup: FormGroup): ValidationErrors | null {
    return MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }
}
