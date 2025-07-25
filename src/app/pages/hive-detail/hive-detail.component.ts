import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveService } from '../../core/services/hive.service';
import { AuthService } from '../../core/services/auth.service';
import { Hive } from '../../models/hive/hive.model';
import { MOCK_HIVES } from '../../models/hive/mock-hives';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hive-detail',
  templateUrl: './hive-detail.component.html',
  styleUrls: ['./hive-detail.component.scss']
})
export class HiveDetailComponent implements OnInit, OnDestroy {
  hive?: Hive;
  editableHive?: Hive;
  mock: boolean = false;
  editMode = false;
  isLoggedIn = false;

  private authSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private hiveService: HiveService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mock = history.state?.mock || false;
    const id = this.route.snapshot.paramMap.get('id')!;

    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLogged => {
      this.isLoggedIn = isLogged;

      // Mock veride kullanıcı giriş yapmışsa anasayfaya at
      if (this.mock && this.isLoggedIn) {
        this.router.navigate(['']);
      } else {
        if (!this.hive) {
          this.loadHive(id);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  loadHive(id: string) {
    if (this.mock) {
      const mockHives: Hive[] = MOCK_HIVES;
      this.hive = mockHives.find(h => h.id === id);
      if (!this.hive) {
        // mock içinde bulunamadıysa anasayfaya yönlendir
        this.router.navigate(['']);
      } else {
        this.resetEditable();
      }
    } else {
      this.hiveService.getHiveById(id).subscribe({
        next: data => {
          this.hive = data;
          this.resetEditable();
        },
        error: err => {
          console.error('Kovan detayları alınırken hata oluştu:', err);
          this.router.navigate(['']); // hata durumunda da anasayfa
        }
      });
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.resetEditable();
    }
  }

  resetEditable() {
    this.editableHive = this.hive ? JSON.parse(JSON.stringify(this.hive)) : undefined;
  }

  saveChanges() {
    if (!this.editableHive) return;

    this.hiveService.updateHive(this.editableHive.id, this.editableHive).subscribe({
      next: updatedHive => {
        this.hive = updatedHive;
        this.editMode = false;
        this.resetEditable();
      },
      error: err => {
        console.error('Güncelleme başarısız:', err);
      }
    });
  }
}
