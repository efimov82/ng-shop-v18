import { Component } from '@angular/core';
import { FormControl, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { AlertService, UserService } from '../../services';
import { UserStore } from '../../store/userStore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form = new FormRecord({
    email: new FormControl<string>(''), //, [Validators.required, Validators.email]
    password: new FormControl<string>(''),
  });

  public errorMessage = '';

  constructor(
    private userService: UserService,
    private userStore: UserStore,
    private alertService: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const formData = this.form.value;
    if (formData['email'] && formData['password']) {
      this.userService
        .login(formData['email'], formData['password'])
        .subscribe({
          next: (data: any) => {
            // TODO type here?
            const token = data.body?.token;

            if (token) {
              // TODO - add templates messages + translates here
              this.alertService.add({ message: 'Welcome!', type: 'success' });
              this.userService.setAuthToken(token);
              this.userStore.loadUserData();

              this.router.navigate(['/']);
            } else {
              throw Error(`Invalid auth response. Token missing.`);
            }
          },
          error: (err) => {
            // console.log('LoginComponent: error=', err.error.message);
            this.errorMessage = err.error.message;
          },
        });
    }
  }
}
