import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HiveService } from '../../../../core/services/hive.service';
import { Hive } from '../../../../models/hive/hive.model';
import { HiveFormDialogComponent } from '../../../../shared/components/dialogs/hive-form-dialog/hive-form-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss']
})
export class HiveListComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() mock: boolean = false;

  hives: Hive[] = [];
  
  constructor(
    private router: Router,
    private hiveService: HiveService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.mock) {
      this.hives = [
        { id: '1', name: 'Kovan A', status: 'Aktif', honeyAmount: 1.2, type: 'Standart', createdAt: '2025-01-01T00:00:00Z', userId: 'user1' },
        { id: '2', name: 'Kovan B', status: 'Dinleniyor', honeyAmount: 0.8, type: 'Standart', createdAt: '2025-01-02T00:00:00Z', userId: 'user1' },
        { id: '3', name: 'Kovan C', status: 'Hasat Yapıldı', honeyAmount: 1.1, type: 'Standart', createdAt: '2025-01-03T00:00:00Z', userId: 'user1' }
      ];
    } else {
      this.hiveService.getAllHives().subscribe({
        next: (data) => {
          this.hives = data;
        },
        error: (err) => {
          console.error('Kovanlar alınamadı:', err);
          this.hives = [];
        }
      });
    }
  }

  drop(event: CdkDragDrop<Hive[]>) {
    moveItemInArray(this.hives, event.previousIndex, event.currentIndex);

    if (!this.mock) {
      // TODO: Sıralama backend'e gönderilebilir
    }
  }

  goToDetail(hiveId: string) {
    this.router.navigate(['/hive-detail', hiveId], {
      state: { mock: this.mock }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(HiveFormDialogComponent, {
      width: '500px',
      height: '450px',
      panelClass: 'custom-dialog-container',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hiveService.createHive(result).subscribe({
          next: (createdHive) => {
            console.log('Yeni kovan eklendi:', createdHive);

            this.loadHives();
          },
          error: (err) => {
            console.error('Kovan eklenirken hata oluştu:', err);
          }
        });
      }
    });
  }

  loadHives() {
    this.hiveService.getAllHives().subscribe(hives => {
      this.hives = hives;
    });
  }

  openEditDialog(hive: Hive) {
    const dialogRef = this.dialog.open(HiveFormDialogComponent, {
      width: '500px',
      height: '450px',
      panelClass: 'custom-dialog-container',
      data: hive
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Düzenlenen kovan:', result);

        // Güncelleme işlemi
        this.hiveService.updateHive(hive.id, result).subscribe({
          next: updatedHive => {
            // Başarılıysa local dizideki veriyi güncelle
            const index = this.hives.findIndex(h => h.id === updatedHive.id);
            if (index > -1) {
              this.hives[index] = updatedHive;
            }
            // İstersen burada bir snackbar vs. göster
            console.log('Kovan başarıyla güncellendi:', updatedHive);
            this.loadHives();
          },
          error: err => {
            console.error('Kovan güncellenirken hata oluştu:', err);
            // İstersen hata mesajı göster
          }
        });
      }
    });
  }

  confirmDelete(hiveId: string) {
    const dialogData: ConfirmDialogData = {
      title: 'Kovan Silme Onayı',
      message: 'Bu kovanı silmek istediğinize emin misiniz?',
      confirmText: 'Sil',
      cancelText: 'İptal'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Kullanıcı onayladı, silme işlemini yap
        this.hiveService.deleteHive(hiveId).subscribe({
          next: () => {
            // Başarıyla silindi, listeyi güncelle
            this.hives = this.hives.filter(h => h.id !== hiveId);
          },
          error: err => {
            console.error('Silme başarısız:', err);
          }
        });
      }
    });
  }
}
