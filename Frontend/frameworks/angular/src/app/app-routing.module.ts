import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from '@shell/pages/main.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'api-benchmark',
        loadChildren: () => import('./modules/api-benchmark/api-benchmark.module').then(m => m.ApiBenchmarkModule)
      },
      {
        path: 'lifecycle-benchmark',
        loadChildren: () => import('./modules/lifecycle-benchmark/lifecycle-benchmarks.module').then(m => m.LifecycleBenchmarksModule)
      },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
