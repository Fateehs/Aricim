import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material modülleri
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginRegisterDialogComponent } from './components/login-register-dialog/login-register-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginRegisterDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
