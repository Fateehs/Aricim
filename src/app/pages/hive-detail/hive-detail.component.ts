import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HiveService } from '../../core/services/hive.service';
import { Hive } from '../../models/hive/hive.model';  // model yolunu kendi projene göre ayarla

@Component({
  selector: 'app-hive-detail',
  templateUrl: './hive-detail.component.html',
  styleUrls: ['./hive-detail.component.scss']
})
export class HiveDetailComponent implements OnInit {
  hive?: Hive;   // 'any' yerine model tipi
  mock: boolean = false;

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
          status: 'Active',         // Ekle
          userId: 'some-user-id',   // Ekle (string olarak uygun guid formatı)
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
    } else {
      this.hiveService.getHiveById(id).subscribe({
        next: (data) => {
          // Eğer backend ile frontend property isimleri farklıysa burada maple
          this.hive = {
            ...data,
            lastInspection: data.lastInspection,
            nextInspection: data.nextInspection,
            queenBirthDate: data.queenBirthDate,
            queenStatus: data.breed,
            requeeningDate: data.requeeningDate,
            combCondition: data.combCondition,
            frameCount: data.frameCount,
            honeyAmount: data.honeyAmount,
            harvestedHoney: data.harvestedHoney,
            feedingStatus: data.feedingStatus,
            diseaseSymptoms: data.diseaseSymptoms,
            beeBehavior: data.beeBehavior,
            pests: data.pests,
            notes: data.notes
          };
        },
        error: (err) => console.error('Kovan detayları alınırken hata oluştu:', err)
      });
    }
  }
}
