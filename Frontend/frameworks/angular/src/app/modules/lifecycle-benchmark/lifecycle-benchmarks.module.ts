import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifecycleBenchmarksRoutingModule } from './lifecycle-benchmarks-routing.module';
import {LifecycleHooksCrudComponent} from '@modules/lifecycle-benchmark/pages/lifecycle-hooks-crud/lifecycle-hooks-crud.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    LifecycleHooksCrudComponent,
  ],
  imports: [
    CommonModule,
    LifecycleBenchmarksRoutingModule,
    SharedModule,
  ]
})
export class LifecycleBenchmarksModule { }
