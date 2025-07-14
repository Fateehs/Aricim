import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hive-summary',
  templateUrl: './hive-summary.component.html',
  styleUrls: ['./hive-summary.component.scss']
})
export class HiveSummaryComponent implements OnInit {
  @Input() mock: boolean = false;

  summary = {
    totalHives: 0,
    activeHives: 0,
    passiveHives: 0,
    totalHoney: 0
  };

  constructor() {}

  ngOnInit(): void {
    if (this.mock) {
      // Misafir kullanıcı için sahte veriler
      this.summary = {
        totalHives: 3,
        activeHives: 2,
        passiveHives: 1,
        totalHoney: 3.1
      };
    } else {
      // Gerçek veri ileride buradan servis aracılığıyla gelecek
      this.summary = {
        totalHives: 12,
        activeHives: 9,
        passiveHives: 3,
        totalHoney: 86.4
      };
    }
  }
}
