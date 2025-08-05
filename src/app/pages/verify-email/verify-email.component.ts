import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  message: string = '';
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      console.log("TOKEN:", token); 

      if (token) {
        this.authService.verifyEmail(token).subscribe({
          next: (res) => {
            this.message = res.message;
          },
          error: (err) => {
            console.log("Doğrulama hatası:", err); 
            this.message = err.error?.message || "Doğrulama başarısız.";
          }
        });
      } else {
        this.message = "Token eksik.";
      }
    });
  }

}
