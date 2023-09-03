import { Component, OnInit } from "@angular/core";
import { TaskDashboardService } from "../../task-dashboard.service";
import { Task } from "../../models/task.interface";
import { TaskList } from "../../models/taskList.interface";
import { FirebaseService } from "src/app/shared/firebase.service";
@Component({
  selector: 'task-dashboard',
  templateUrl: 'task-dashboard.component.html',
  styleUrls: ['task-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  constructor(
    private taskService: TaskDashboardService,
    private firebase: FirebaseService
    ) {}
  
  currentTaskListIndex: number = 0
  username: string = 'TO DO Some username'
  taskLists: TaskList[] = this.firebase.taskLists

  // Init
  async ngOnInit() {
    await this.firebase.getTaskLists()
    this.taskLists = this.firebase.taskLists
  }
  // Logout
  handleLogOut() {
    this.firebase.logout()
  }

  // TaskLists
  async handleTaskListAdd() {
    await this.firebase.createNewTaskList()
    this.taskLists = this.firebase.taskLists
  }
  handleCurrentTaskListIndexChange(event: any) {
    this.currentTaskListIndex = event
  }
  async handleTaskListRemove(event: any) {
    await this.firebase.deleteTaskList(event.taskList.id)
    this.taskLists = this.firebase.taskLists
  }
  async handleTaskListEditName(event: any) {
    await this.firebase.editTaskList(event.taskList.id, event.newTaskListName)
    this.taskLists = this.firebase.taskLists
  }

  // Tasks
  async handleTaskAdd(event: any) {
    const taskListId = this.taskLists[this.currentTaskListIndex].id
    await this.firebase.createNewTask(taskListId, event.taskDesc)
    this.taskLists = this.firebase.taskLists
  }
  async handleTaskRemove(event: any) {
    const taskListId = this.taskLists[this.currentTaskListIndex].id
    await this.firebase.deleteTask(taskListId, event.id)
    this.taskLists = this.firebase.taskLists
  }
  async handleTaskChangeDone(event: any) {
    const taskListId = this.taskLists[this.currentTaskListIndex].id
    await this.firebase.changeTaskDone(taskListId, event.id, !event.done)
    this.taskLists = this.firebase.taskLists
  }
  async handleTaskEditTitle(event: any) {
    const taskListId = this.taskLists[this.currentTaskListIndex].id
    await this.firebase.editTaskTitle(taskListId, event.task.id, event.newTitle)
    this.taskLists = this.firebase.taskLists
    // event.task.title = event.newTitle
    // this.taskService.updateTaskLists(this.taskLists)
  }
}