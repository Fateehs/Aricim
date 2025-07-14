import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { LoginRegisterDialogComponent } from '../../shared/components/login-register-dialog/login-register-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.openLoginRegisterDialog();
    }
  }

  openLoginRegisterDialog() {
    this.dialog.open(LoginRegisterDialogComponent, {
      panelClass: 'custom-dialog-container'
    });

  }

}
