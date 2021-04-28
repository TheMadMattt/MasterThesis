import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LifecycleHooksCrudComponent} from '@modules/lifecycle-benchmark/pages/lifecycle-hooks-crud/lifecycle-hooks-crud.component';

const routes: Routes = [
  {
    path: 'lifecycle-hooks',
    component: LifecycleHooksCrudComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifecycleBenchmarksRoutingModule { }
