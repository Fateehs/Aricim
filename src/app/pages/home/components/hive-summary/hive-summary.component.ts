import { Component, Input, OnInit } from '@angular/core';
import { HiveService } from '../../../../core/services/hive.service';

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

  constructor(private hiveService: HiveService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    if (this.mock) {
      this.summary = {
        totalHives: 3,
        activeHives: 2,
        passiveHives: 1,
        totalHoney: 3.1
      };
    } else {
      this.hiveService.getSummary().subscribe({
        next: (data) => {
          this.summary = data;
        },
        error: (err) => {
          console.error('Summary alınamadı:', err);
        }
      });
    }
  }

  refresh() {
    this.loadSummary();
    console.log("yenilendi");
  }
}
