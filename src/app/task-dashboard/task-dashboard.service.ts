import { Injectable } from "@angular/core";

import { Task } from "./models/task.interface";
import { User } from "./models/user.interface";

@Injectable()
export class TaskDashboardService {
  constructor() {}
  getTasks() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || '{}') : []
  }
  updateTasks(taskObject: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(taskObject))
  }
  getUsers() {
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') || '{}') : []
  }
  updateUsers(userObject: User[]) {
    localStorage.setItem('users', JSON.stringify(userObject))
  }
}