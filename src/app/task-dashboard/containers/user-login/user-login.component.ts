import { Component, OnInit } from '@angular/core';
import { TaskDashboardService } from '../../task-dashboard.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.interface';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})

export class UserLoginComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private taskService: TaskDashboardService) {}

  hide = true;
  users: User[] = [
    // {
    //     "username": "123",
    //     "password": "abc"
    // },
    // {
    //     "username": "456",
    //     "password": "dfe"
    // },
    // {
    //     "username": "789",
    //     "password": "ghi"
    // }
  ]

  ngOnInit(): void {
    this.users = this.taskService.getUsers()
    console.log(this.users)
  }

  handleOpenSnackBar(message: string) {
    this.snackBar.open(message, 'DISMISS')
  }
  handleSubmit(userLoginForm: NgForm, action: any) {
    if (userLoginForm.valid) {
      if (action == "createNewProfile") {
        this.handleCreateNewProfile(userLoginForm, userLoginForm.value)
      }
      else if (action == "signIn") {
        this.handleSignIn(userLoginForm, userLoginForm.value)
      }
    }
    else this.handleOpenSnackBar('Incorrect username or/and password!')
  }
  handleCreateNewProfile(userLoginForm: NgForm, values: User) {
    for (let user of this.users) {
      if (user.username === values.username) {
        return this.handleOpenSnackBar('Username is already taken!')
      }
    }
    this.users.push(values)
    this.taskService.updateUsers(this.users)
    userLoginForm.resetForm()
    this.handleOpenSnackBar('Successfully created new profile.')
  }
  handleSignIn(userLoginForm: NgForm, values: User) {
    for (let user of this.users) {
      if (user.username === values.username) {
        if (user.password === values.password) {
          userLoginForm.resetForm()
          return this.handleOpenSnackBar('Successfully logged in. (Not really tho)')
        }
      }
      this.handleOpenSnackBar('Incorrect username or/and password!')
    }
  }
}
