import { Component } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  FormRecord,
  Validators,
} from '@angular/forms';
import { FieldErrorComponent } from '../../components/field-error/field-error.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, FieldErrorComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  form = new FormRecord({
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl<string>(''),
  });

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData = this.form.value;
  }
}
