import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  returnUrl: string = '/'; // Varsayılan ana sayfa

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private router: Router,
    private route: ActivatedRoute  // ActivatedRoute eklendi
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Query parametrelerden returnUrl yakala
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.snackbar.show("Giriş Başarılı!");
          localStorage.setItem('isLoggedIn', 'true');

          // Başarılı login sonrası returnUrl'ye git
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          console.error('Giriş hatası:', err);
          alert('Email veya parola hatalı!');
        }
      });
    }
  }
}
