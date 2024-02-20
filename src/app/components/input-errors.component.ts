import { Component, OnInit, input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

const FORM_VALIDATION_MESSAGES = {
  displayName: [
    { type: 'required', message: 'This Field is Required' },
    {
      type: 'minlength',
      message: 'Display Name must be at least 3 characters',
    },
  ],
  email: [
    { type: 'required', message: 'This Field is Required' },
    { type: 'email', message: 'Email should be of Valid Format' },
  ],
  password: [
    { type: 'required', message: 'This Field is Required' },
    { type: 'minlength', message: 'Password must be at least 6 characters' },
  ],
  select: [{ type: 'required', message: 'This Field is Required' }],
  date: [{ type: 'required', message: 'This Field is Required' }],
  text: [{ type: 'required', message: 'This Field is Required' }],
};

@Component({
  selector: 'input-error-messages',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    @for (validation of errorMessages; track $index) { @if
    (control().hasError(validation.type) && control().touched) {
    <span class="label-text-alt text-error">{{ validation.message }}</span>
    } }
  `,
})
export class InputErrorsComponent implements OnInit {
  control = input.required<AbstractControl>();
  errorMessageKeyName = input.required<
    'displayName' | 'email' | 'password' | 'select' | 'date' | 'text'
  >();
  errorMessages!: {
    type: string;
    message: string;
  }[];

  ngOnInit(): void {
    this.errorMessages = FORM_VALIDATION_MESSAGES[this.errorMessageKeyName()];
  }
}
