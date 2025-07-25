import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private sub: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

goToLogin() {
  const returnUrl = this.router.url;
  this.router.navigate(['/login'], { queryParams: { returnUrl } });
}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
  }
}
