import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register-dialog',
  templateUrl: './login-register-dialog.component.html',
  styleUrls: ['./login-register-dialog.component.scss']
})
export class LoginRegisterDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<LoginRegisterDialogComponent>,
    private router: Router
  ) {}

  navigateTo(path: string) {
    this.dialogRef.close();
    this.router.navigate([path]);
  }

  close() {
    this.dialogRef.close();
  }
}
