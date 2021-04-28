import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBenchmarkRoutingModule } from './api-benchmark-routing.module';
import {SharedModule} from '@shared/shared.module';
import {JsonPlaceholderComponent} from '@modules/api-benchmark/pages/json-placeholder/json-placeholder.component';
import {RandomUserGeneratorComponent} from '@modules/api-benchmark/pages/random-user-generator/random-user-generator.component';
import {PostFormComponent} from '@modules/api-benchmark/components/post-form/post-form.component';
import {TaskFormComponent} from '@modules/api-benchmark/components/task-form/task-form.component';
import {LocalRestApiServerComponent} from '@modules/api-benchmark/pages/local-rest-api-server/local-rest-api-server.component';


@NgModule({
  declarations: [RandomUserGeneratorComponent, JsonPlaceholderComponent,
    PostFormComponent, LocalRestApiServerComponent, TaskFormComponent],
  imports: [
    CommonModule,
    ApiBenchmarkRoutingModule,
    SharedModule
  ]
})
export class ApiBenchmarkModule { }
