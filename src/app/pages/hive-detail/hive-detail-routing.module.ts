import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiveDetailComponent } from './hive-detail.component';

const routes: Routes = [{ path: '', component: HiveDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiveDetailRoutingModule { }
