import { Component } from "@angular/core";

import { Task } from "../../models/task.interface";

@Component({
  selector: 'task-form',
  styleUrls: ['task-form.component.scss'],
  template: `
    <form 
      (ngSubmit)="handleSubmit(form.value)"
      #form="ngForm"
      novalidate>
      <input 
        type="text"
        name="taskDesc"
        #taskDesc="ngModel"
        ngModel
        maxlength="30"
        minlength="5"
        placeholder="Create new task"
        required />
      <button type="submit" [disabled]="form.invalid">Add</button>
      <div *ngIf="(taskDesc.errors?.['minlength'] || taskDesc.errors?.['required']) && taskDesc.dirty">
        At least 5 characters required!
      </div>
    </form>
  `
})

export class TaskFormComponent {
  handleSubmit(newTask: any) {}
}