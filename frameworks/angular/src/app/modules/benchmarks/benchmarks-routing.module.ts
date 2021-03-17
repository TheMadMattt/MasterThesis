import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AngularCrudComponent} from "@modules/benchmarks/pages/angular-crud/angular-crud.component";

const routes: Routes = [
  {
    path: 'angular-crud',
    component: AngularCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenchmarksRoutingModule { }
