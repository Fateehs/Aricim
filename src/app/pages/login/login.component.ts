import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Giriş başarılı:', res.message);
          alert(res.message);
          localStorage.setItem('isLoggedIn', 'true');
          // Eğer token varsa burada sakla:
          // localStorage.setItem('token', res.token);

          // Örnek yönlendirme:
          // this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Giriş hatası:', err);
          alert('Email veya parola hatalı!');
        }
      });
    }
  }
}
