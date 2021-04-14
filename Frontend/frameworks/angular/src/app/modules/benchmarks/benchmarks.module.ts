import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenchmarksRoutingModule } from './benchmarks-routing.module';
import {SharedModule} from '@shared/shared.module';
import {LifecycleHooksCrudComponent} from '@modules/benchmarks/pages/lifecycle-hooks-crud/lifecycle-hooks-crud.component';
import { RandomUserGeneratorComponent } from './pages/random-user-generator/random-user-generator.component';
import { JsonPlaceholderComponent } from './pages/json-placeholder/json-placeholder.component';
import {PostFormComponent} from '@modules/benchmarks/components/post-form/post-form.component';
import { LocalRestApiServerComponent } from './pages/local-rest-api-server/local-rest-api-server.component';
import {TaskFormComponent} from '@modules/benchmarks/components/task-form/task-form.component';


@NgModule({
  declarations: [LifecycleHooksCrudComponent, RandomUserGeneratorComponent, JsonPlaceholderComponent,
    PostFormComponent, LocalRestApiServerComponent, TaskFormComponent],
  imports: [
    CommonModule,
    BenchmarksRoutingModule,
    SharedModule
  ]
})
export class BenchmarksModule { }
