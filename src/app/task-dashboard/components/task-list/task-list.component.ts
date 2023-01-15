import { Component, Input } from "@angular/core";

import { Task } from "../../models/task.interface";

@Component({
  selector: 'task-list',
  styleUrls: ['task-list.component.scss'],
  template: `
    <li class="task" [class.taskDone]="task.done">
      {{ task.title }}
      <button (click)="changeDone(task)"> Done </button>
      <button (click)="handleRemove(task)"> Remove </button>
    </li>
  `
})

export class TaskListComponent {
  @Input()
  task!: Task

  changeDone(event: Task) {
    // event.done = !event.done
  }
  handleRemove(event: Task) {
    // this.tasks = this.tasks.filter((task: Task) => {
    //   return event.id !== task.id
    // })
  }
}