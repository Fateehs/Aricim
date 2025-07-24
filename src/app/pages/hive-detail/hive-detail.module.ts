import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveDetailRoutingModule } from './hive-detail-routing.module';
import { HiveDetailComponent } from './hive-detail.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HiveDetailComponent
  ],
  imports: [
    CommonModule,
    HiveDetailRoutingModule,
    FormsModule,
    MatIconModule
  ]
})
export class HiveDetailModule { }
