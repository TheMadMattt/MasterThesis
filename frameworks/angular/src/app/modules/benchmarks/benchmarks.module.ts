import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchmarksRoutingModule } from './benchmarks-routing.module';
import {SharedModule} from "@shared/shared.module";
import {LifecycleHooksCrudComponent} from "@modules/benchmarks/pages/lifecycle-hooks-crud/lifecycle-hooks-crud.component";


@NgModule({
  declarations: [LifecycleHooksCrudComponent],
  imports: [
    CommonModule,
    BenchmarksRoutingModule,
    SharedModule
  ]
})
export class BenchmarksModule { }
