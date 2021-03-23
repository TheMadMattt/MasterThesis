import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LifecycleHooksCrudComponent} from '@modules/benchmarks/pages/lifecycle-hooks-crud/lifecycle-hooks-crud.component';
import {RestApiCrudComponent} from '@modules/benchmarks/pages/rest-api-crud/rest-api-crud.component';

const routes: Routes = [
  {
    path: 'lifecycle-crud',
    component: LifecycleHooksCrudComponent
  },
  {
    path: 'rest-api-crud',
    component: RestApiCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenchmarksRoutingModule { }
