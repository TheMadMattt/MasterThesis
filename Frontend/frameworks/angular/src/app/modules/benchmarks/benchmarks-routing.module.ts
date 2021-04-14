import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LifecycleHooksCrudComponent} from '@modules/benchmarks/pages/lifecycle-hooks-crud/lifecycle-hooks-crud.component';
import {RandomUserGeneratorComponent} from '@modules/benchmarks/pages/random-user-generator/random-user-generator.component';
import {JsonPlaceholderComponent} from '@modules/benchmarks/pages/json-placeholder/json-placeholder.component';
import {LocalRestApiServerComponent} from '@modules/benchmarks/pages/local-rest-api-server/local-rest-api-server.component';

const routes: Routes = [
  {
    path: 'lifecycle-crud',
    component: LifecycleHooksCrudComponent
  },
  {
    path: 'random-user-generator',
    component: RandomUserGeneratorComponent
  },
  {
    path: 'json-placeholder',
    component: JsonPlaceholderComponent
  },
  {
    path: 'local-rest-api',
    component: LocalRestApiServerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BenchmarksRoutingModule { }
