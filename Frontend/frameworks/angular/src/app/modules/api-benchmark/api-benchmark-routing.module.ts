import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JsonPlaceholderComponent} from '@modules/api-benchmark/pages/json-placeholder/json-placeholder.component';
import {RandomUserGeneratorComponent} from '@modules/api-benchmark/pages/random-user-generator/random-user-generator.component';
import {LocalRestApiServerComponent} from '@modules/api-benchmark/pages/local-rest-api-server/local-rest-api-server.component';

const routes: Routes = [
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
export class ApiBenchmarkRoutingModule { }
