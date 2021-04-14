import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DisplayTimeComponent } from './display-time/display-time.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [DisplayTimeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    DisplayTimeComponent,
    NgxSpinnerModule,
    OverlayModule
  ]
})
export class SharedModule { }
