import { Component, OnInit } from "@angular/core";
import { TaskDashboardService } from "../../task-dashboard.service";
import { Task } from "../../models/task.interface";
import { TaskList } from "../../models/taskList.interface";

@Component({
  selector: 'task-dashboard',
  templateUrl: 'task-dashboard.component.html',
  styleUrls: ['task-dashboard.component.scss']
})

export class TaskDashboardComponent implements OnInit {
  constructor(private taskService: TaskDashboardService) {}
  
  taskLists: TaskList[] = [{id: 0, listName: "Your new task list", tasks: []}]
  currentTaskListIndex: number = 0
  username: string = this.taskService.getLoggedUser()

  // Get TaskLists
  ngOnInit() {
    this.taskLists = this.taskService.getTaskLists()
  }
  // Logout
  handleLogOut() {
    this.taskService.logOutUser()
    window.location.reload()
  }
  // TaskLists
  handleTaskListAdd() {
    this.taskLists.push({id: this.taskLists[this.taskLists.length - 1].id + 1, listName: "New Task List", tasks: []})
    this.taskService.updateTaskLists(this.taskLists)
  }
  handleCurrentTaskListIndexChange(event: any) {
    this.currentTaskListIndex = event
  }
  handleTaskListRemove(event: any) {
    if (this.taskLists.length > 1) {
      if (event.index == this.currentTaskListIndex) this.currentTaskListIndex = 0
      this.taskLists = this.taskLists.filter((taskList: TaskList) => {
        return event.taskList.id !== taskList.id
      })
      this.taskService.updateTaskLists(this.taskLists)
    }
  }
  handleTaskListEditName(event: any) {
    event.taskList.listName = event.newTaskListName
    this.taskService.updateTaskLists(this.taskLists)
  }
  // Tasks
  handleTaskAdd(event: any) {
    let tasks = this.taskLists[this.currentTaskListIndex].tasks

    if (tasks.length > 0) tasks.push({id: tasks[tasks.length - 1].id + 1, title: event.taskDesc, done: false})
    else tasks.push({id: 0, title: event.taskDesc, done: false})
    this.taskLists[this.currentTaskListIndex].tasks = tasks
    this.taskService.updateTaskLists(this.taskLists)
  }
  handleTaskRemove(event: any) {
    let tasks = this.taskLists[this.currentTaskListIndex].tasks
    
    tasks = tasks.filter((task: Task) => {
      return event.id !== task.id
    })
    this.taskLists[this.currentTaskListIndex].tasks = tasks
    this.taskService.updateTaskLists(this.taskLists)
  }
  handleTaskChangeDone(event: any) {
    event.done = !event.done
    this.taskService.updateTaskLists(this.taskLists)
  }
  handleTaskEditTitle(event: any) {
    event.task.title = event.newTitle
    this.taskService.updateTaskLists(this.taskLists)
  }
}