import { Injectable } from "@angular/core";

import { Task } from "./models/task.interface";

@Injectable()
export class TaskDashboardService {
  constructor() {}
  getLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '{}') : []
  }
  updateLocalStorage(tasksObject: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasksObject))
  }
}