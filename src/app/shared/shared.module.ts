import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material modülleri
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginRegisterDialogComponent } from './components/dialogs/login-register-dialog/login-register-dialog.component';
import { HiveFormDialogComponent } from './components/dialogs/hive-form-dialog/hive-form-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginRegisterDialogComponent,
    HiveFormDialogComponent,
    ConfirmDialogComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule

  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    MatDialogModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
