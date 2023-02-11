import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Task } from "../../models/task.interface";

@Component({
  selector: 'task-tile',
  styleUrls: ['task-tile.component.scss'],
  template: `
    <div class="taskTileComponent">
      <div class="taskText">
        <div class="taskIndex">{{ i + 1 }}.</div>
        <div class="taskTitle" [class.taskDone]="task.done">{{ task.title }}</div>
      </div>
      <div class="taskButtons">
        <button class="taskDoneButton" (click)="changeDone(task)"> &#10004; </button>
        <button class="taskRemoveButton" (click)="onRemove(task)"> &#10006; </button>
      </div>
    </div>
  `
})

export class TaskTileComponent {
  @Input()
  task!: Task
  @Input()
  i!: number
  @Output()
  remove: EventEmitter<any> = new EventEmitter()
  @Output()
  done: EventEmitter<any> = new EventEmitter()

  changeDone(event: Task) {
    this.done.emit(this.task)
  }
  onRemove(event: Task) {
    this.remove.emit(this.task)
  }
}