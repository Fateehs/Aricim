import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss']
})
export class HiveListComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() mock: boolean = false;

  hives: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.mock) {
      this.hives = [
        { id: 1, name: 'Kovan A', status: 'Aktif', honey: '1.2 kg', notes: 'Demo veri' },
        { id: 2, name: 'Kovan B', status: 'Dinleniyor', honey: '0.8 kg', notes: 'Demo veri' },
        { id: 3, name: 'Kovan C', status: 'Hasat Yapıldı', honey: '1.1 kg', notes: 'Demo veri' }
      ];
    } else {
      // Gerçek veriler ileride backend'den gelecek
      this.hives = [
        { id: 101, name: 'Gerçek Kovan 1', status: 'Aktif', honey: '2.5 kg', notes: 'Servisten gelecek' },
        { id: 102, name: 'Gerçek Kovan 2', status: 'Dinleniyor', honey: '1.9 kg', notes: 'Servisten gelecek' }
      ];
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.hives, event.previousIndex, event.currentIndex);

    if (!this.mock) {
      // TODO: Sıralama değişikliğini backend'e gönder
    }
  }

  goToDetail(hiveId: number) {
    this.router.navigate(['/hive-detail', hiveId], {
      state: { mock: this.mock }
    });
  }
}
