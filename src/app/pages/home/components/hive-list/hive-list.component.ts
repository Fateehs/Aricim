import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { HiveService } from '../../../../core/services/hive.service';
import { Hive } from '../../../../models/hive/hive.model';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss']
})
export class HiveListComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() mock: boolean = false;

  hives: Hive[] = [];

  constructor(private router: Router, private hiveService: HiveService) { }

  ngOnInit(): void {
    if (this.mock) {
      this.hives = [
        { id: '1', name: 'Kovan A', status: 'Aktif', honeyAmount: 1.2, type: 'Standart', createdAt: '2025-01-01T00:00:00Z', userId: 'user1' },
        { id: '2', name: 'Kovan B', status: 'Dinleniyor', honeyAmount: 0.8, type: 'Standart', createdAt: '2025-01-02T00:00:00Z', userId: 'user1' },
        { id: '3', name: 'Kovan C', status: 'Hasat Yapıldı', honeyAmount: 1.1, type: 'Standart', createdAt: '2025-01-03T00:00:00Z', userId: 'user1' }
      ];

    }
    else {
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
}
