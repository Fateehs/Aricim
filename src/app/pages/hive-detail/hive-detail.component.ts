import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hive-detail',
  templateUrl: './hive-detail.component.html',
  styleUrls: ['./hive-detail.component.scss']
})
export class HiveDetailComponent implements OnInit {
  hive: any;
  mock: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.mock = history.state?.mock || false;

    if (this.mock) {
      const mockHives = [
        {
          id: 1,
          name: 'Kovan A',
          type: 'Langstroth',
          createdAt: '2024-01-15',
          lastInspectionDate: '2025-06-10',
          nextInspectionDate: '2025-07-20',
          queenBornDate: '2024-03-01',
          queenStatus: 'Aktif',
          queenBreed: 'Karniyol',
          isMarked: true,
          requeenDate: null,
          combStatus: 'İyi durumda',
          combNumber: 10,
          honeyAmount: '1.2 kg',
          harvestedHoney: '0.5 kg',
          feedingStatus: 'Şeker şurubu verildi',
          diseaseSigns: 'Yok',
          temperament: 'Sakin',
          pestStatus: 'Varroa kontrol altında',
          notes: 'Yeni petekler eklendi.',
          photos: []
        }
      ];
      this.hive = mockHives.find(h => h.id === id);
    } else {
      // TODO: Gerçek veriyi servisten çek
    }
  }
}
