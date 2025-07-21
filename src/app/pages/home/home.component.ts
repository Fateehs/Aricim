import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { LoginRegisterDialogComponent } from '../../shared/components/dialogs/login-register-dialog/login-register-dialog.component';
import { Subscription } from 'rxjs';
import { HiveSummaryComponent } from './components/hive-summary/hive-summary.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('hiveSummary') hiveSummary?: HiveSummaryComponent;
  private authSubscription?: Subscription;

  constructor(
    public authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.openLoginRegisterDialog();
      }
    });
  }

  onHiveListChanged(){
    this.hiveSummary?.refresh();
    console.log("yenilendi test");
  }

  openLoginRegisterDialog() {
    this.dialog.open(LoginRegisterDialogComponent, {
      panelClass: 'custom-dialog-container'
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
