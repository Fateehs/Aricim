import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HiveDetailRoutingModule } from './hive-detail-routing.module';
import { HiveDetailComponent } from './hive-detail.component';


@NgModule({
  declarations: [
    HiveDetailComponent
  ],
  imports: [
    CommonModule,
    HiveDetailRoutingModule
  ]
})
export class HiveDetailModule { }
