import { Component } from '@angular/core';

interface Task {
  id: number,
  title: string
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div>
      <header>To do list</header>
      <div>Tasks:</div>
      <ol>
        <li *ngFor="let task of tasks">
          {{ task.title}}
        </li>
      </ol>
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
          required />
        <button type="submit" [disabled]="form.invalid">Add new task</button>
        <div *ngIf="(taskDesc.errors?.['minlength'] || taskDesc.errors?.['required']) && taskDesc.dirty">
          At least 5 characters required!
        </div>
      </form>
    </div>
  `
})
export class AppComponent {
  title: string = 'to-do-list'

  tasks: Task[] = [{
    id: 1,
    title: "Wash the dishes",
  }, {
    id: 2,
    title: "Do the laundry",
  }, {
    id: 3,
    title: "Buy some bread",
  }]

  handleSubmit(newTask: string) {
    
  }


}