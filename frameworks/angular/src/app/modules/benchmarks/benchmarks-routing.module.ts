import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LifecycleHooksCrudComponent} from "@modules/benchmarks/pages/lifecycle-hooks-crud/lifecycle-hooks-crud.component";

const routes: Routes = [
  {
    path: 'angular-crud',
    component: LifecycleHooksCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenchmarksRoutingModule { }
