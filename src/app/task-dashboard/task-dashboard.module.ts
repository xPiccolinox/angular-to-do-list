import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from 'src/app/app-routing.module';

import { TaskDashboardComponent } from './containers/task-dashboard/task-dashboard.component';
import { TaskFormComponent } from './components/task-form.component.ts/task-form.component';
import { TaskTileComponent } from './components/task-tile/task-tile.component';
import { TaskDashboardService } from './task-dashboard.service';
import { UserLoginComponent } from './containers/user-login/user-login.component';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    TaskDashboardComponent,
    TaskFormComponent,
    TaskTileComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    TaskDashboardComponent,
    UserLoginComponent
  ],
  providers: [
    TaskDashboardService
  ]
})

export class TaskDashboardModule {}