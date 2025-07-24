import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HiveService } from '../../core/services/hive.service';
import { Hive } from '../../models/hive/hive.model';  // Model yolunu projene göre ayarla

@Component({
  selector: 'app-hive-detail',
  templateUrl: './hive-detail.component.html',
  styleUrls: ['./hive-detail.component.scss']
})
export class HiveDetailComponent implements OnInit {
  hive?: Hive;
  editableHive?: Hive;
  mock: boolean = false;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private hiveService: HiveService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.mock = history.state?.mock || false;

    if (this.mock) {
      const mockHives: Hive[] = [
        {
          id: '1',
          name: 'Kovan A',
          type: 'Langstroth',
          createdAt: '2024-01-15',
          status: 'Active',
          userId: 'some-user-id',
          lastInspection: '2025-06-10',
          nextInspection: '2025-07-20',
          queenBirthDate: '2024-03-01',
          queenStatus: 'Aktif',
          breed: 'Karniyol',
          isMarked: true,
          requeeningDate: null,
          combCondition: 'İyi durumda',
          frameCount: 10,
          honeyAmount: 1.2,
          harvestedHoney: 0.5,
          feedingStatus: 'Şeker şurubu verildi',
          diseaseSymptoms: 'Yok',
          beeBehavior: 'Sakin',
          pests: 'Varroa kontrol altında',
          notes: 'Yeni petekler eklendi.'
        }
      ];
      this.hive = mockHives.find(h => h.id === id);
      this.resetEditable();
    } else {
      this.hiveService.getHiveById(id).subscribe({
        next: (data) => {
          this.hive = data;
          this.resetEditable();
        },
        error: (err) => console.error('Kovan detayları alınırken hata oluştu:', err)
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
      next: (updatedHive) => {
        this.hive = updatedHive; // Backend’den dönen güncel veriyi ata
        this.editMode = false;
        this.resetEditable();
        // İstersen burada Snackbar/Toast ile "Güncelleme başarılı" bildirimi verebilirsin
      },
      error: (err) => {
        console.error('Güncelleme başarısız:', err);
        // Hata mesajı gösterilebilir
      }
    });
  }

}
