import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-hive-list',
  templateUrl: './hive-list.component.html',
  styleUrls: ['./hive-list.component.scss']
})
export class HiveListComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() mock: boolean = false;

  hives: any[] = [];

  ngOnInit(): void {
    if (this.mock) {
      this.hives = [
        { id: 1, name: 'Kovan A', status: 'Aktif', honey: '1.2 kg' },
        { id: 2, name: 'Kovan B', status: 'Dinleniyor', honey: '0.8 kg' },
        { id: 3, name: 'Kovan C', status: 'Hasat Yapıldı', honey: '1.1 kg' }
      ];
    } else {
      // Gerçek veriler ileride servisten gelecek, şimdilik sabit
      this.hives = [
        { id: 101, name: 'Gerçek Kovan 1', status: 'Aktif', honey: '2.5 kg' },
        { id: 102, name: 'Gerçek Kovan 2', status: 'Dinleniyor', honey: '1.9 kg' }
      ];
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.hives, event.previousIndex, event.currentIndex);

    if (!this.mock) {
      // TODO: Giriş yapılmışsa sıralama değişikliğini backend'e gönder
    }
  }
}
