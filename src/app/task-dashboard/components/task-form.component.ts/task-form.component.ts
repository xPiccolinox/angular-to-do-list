import { Component, Output, EventEmitter } from "@angular/core";

import { Task } from "../../models/task.interface";

@Component({
  selector: 'task-form',
  styleUrls: ['task-form.component.scss'],
  template: `
    <form 
      (ngSubmit)="handleSubmit(form.value, form.valid); form.reset()"
      #form="ngForm"
      novalidate>
      <input 
        type="text"
        class="formInput"
        name="taskDesc"
        #taskDesc="ngModel"
        ngModel
        maxlength="30"
        minlength="5"
        placeholder="Create new task"
        autocomplete="off"
        spellcheck="false"
        required />
      <button class="formSubmit" type="submit" [disabled]="form.invalid">Add</button>
      <div class="formInputError" *ngIf="(taskDesc.errors?.['minlength'] || taskDesc.errors?.['required']) && taskDesc.dirty">
        At least 5 characters required!
      </div>
    </form>
    <!-- <form>TaskForm Test</form> -->
  `
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