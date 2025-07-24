import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackbar: SnackbarService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.snackbar.show("Giriş Başarılı!");
          localStorage.setItem('isLoggedIn', 'true');
          this.goToHome();
        },
        error: (err) => {
          console.error('Giriş hatası:', err);
          alert('Email veya parola hatalı!');
        }
      });
    }
  }

  goToHome() {
  this.router.navigate(['']);
}
}
