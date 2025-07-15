import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ← BURAYA EKLE

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HiveSummaryComponent } from './components/hive-summary/hive-summary.component';
import { HiveListComponent } from './components/hive-list/hive-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    HiveSummaryComponent,
    HiveListComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    HomeRoutingModule,
    MatListModule,
    MatCardModule,
    DragDropModule,
    MatIconModule
  ]
})
export class HomeModule { }
