import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from 'src/app/app-routing.module';

import { TaskDashboardComponent } from './containers/task-dashboard.component';
import { TaskFormComponent } from './components/task-form.component.ts/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDashboardService } from './task-dashboard.service';

@NgModule({
  declarations: [
    TaskDashboardComponent,
    TaskFormComponent,
    TaskListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    TaskDashboardComponent
  ],
  providers: [
    TaskDashboardService
  ]
})

export class TaskDashboardModule {}