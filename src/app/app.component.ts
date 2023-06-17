import { Component } from '@angular/core';
import { TaskDashboardService } from './task-dashboard/task-dashboard.service';

interface Task {
  id: number,
  title: string,
  done: boolean
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <!-- <task-dashboard *ngIf="loggedIn"></task-dashboard>
    <user-login *ngIf="!loggedIn"></user-login> -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private taskService: TaskDashboardService) {
    if (this.loggedUsername.length > 0) this.loggedIn = true
  }
  loggedUsername: string = this.taskService.getLoggedUser()
  loggedIn: boolean = false
}