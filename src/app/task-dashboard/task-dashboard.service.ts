import { Injectable } from "@angular/core";

import { Task } from "./models/task.interface";
import { TaskList } from "./models/taskList.interface";
import { User } from "./models/user.interface";

@Injectable()
export class TaskDashboardService {
  constructor() {}

  // loggedUser = this.getLoggedUser()

  // Tasks
  // getTaskLists() {
  //   return localStorage.getItem(this.loggedUser + '_tasks') ? JSON.parse(localStorage.getItem(this.loggedUser + '_tasks') || '[{id: 0, listName: "Your new task list", tasks: []}]') : [{id: 0, listName: "Your new task list", tasks: []}]
  // }
  // updateTaskLists(taskLists: TaskList[]) {
  //   localStorage.setItem(this.loggedUser + '_tasks', JSON.stringify(taskLists))
  // }
  // // Users
  // getUsers() {
  //   return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') || '[]') : []
  // }
  // updateUsers(userObject: User[]) {
  //   localStorage.setItem('users', JSON.stringify(userObject))
  // }
  // // User log in / out
  // getLoggedUser() {
  //   return localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser') || '') : ''
  // }
  // logInUser(username: string) {
  //   localStorage.setItem('loggedUser', JSON.stringify(username))
  // }
  // logOutUser() {
  //   localStorage.setItem('loggedUser', '')
  // }
}