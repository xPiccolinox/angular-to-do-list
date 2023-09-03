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
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private taskService: TaskDashboardService) {}
}