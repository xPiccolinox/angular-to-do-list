import { Component, Output, EventEmitter } from "@angular/core";

import { Task } from "../../models/task.interface";

@Component({
  selector: 'task-form',
  templateUrl: 'task-form.component.html',
  styleUrls: ['task-form.component.scss']
})

export class TaskFormComponent {
  @Output()
  addNew: EventEmitter<Task> = new EventEmitter<Task>()

  handleSubmit(newTask: Task, isValid: any) {
    if (isValid) {
      this.addNew.emit(newTask)
    }
  }
}