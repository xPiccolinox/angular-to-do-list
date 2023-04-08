import { Injectable } from "@angular/core";

import { Task } from "./models/task.interface";
import { User } from "./models/user.interface";

@Injectable()
export class TaskDashboardService {
  constructor() {}

  loggedUser = this.getLoggedUser()

  // Tasks
  getTasks() {
    return localStorage.getItem(this.loggedUser + 'tasks') ? JSON.parse(localStorage.getItem(this.loggedUser + 'tasks') || '[]') : []
  }
  updateTasks(taskObject: Task[]) {
    localStorage.setItem(this.loggedUser + 'tasks', JSON.stringify(taskObject))
  }
  // Users
  getUsers() {
    return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') || '[]') : []
  }
  updateUsers(userObject: User[]) {
    localStorage.setItem('users', JSON.stringify(userObject))
  }
  // User log in / out
  getLoggedUser() {
    return localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser') || '') : ''
  }
  logInUser(username: string) {
    localStorage.setItem('loggedUser', JSON.stringify(username))
  }
  logOutUser() {
    localStorage.setItem('loggedUser', '')
  }
}