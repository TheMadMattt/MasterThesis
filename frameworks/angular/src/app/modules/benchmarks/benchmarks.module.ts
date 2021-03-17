import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BenchmarksRoutingModule } from './benchmarks-routing.module';
import { AngularCrudComponent } from './pages/angular-crud/angular-crud.component';


@NgModule({
  declarations: [AngularCrudComponent],
  imports: [
    CommonModule,
    BenchmarksRoutingModule
  ]
})
export class BenchmarksModule { }
