import { Component, OnInit } from '@angular/core';
import { TaskDashboardService } from '../../task-dashboard.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.interface';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})

export class UserLoginComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private taskService: TaskDashboardService,
    private auth: AuthService
  ) {}

  hide = true;
  users: User[] = []
  email: string = ''
  password: string = ''

  ngOnInit(): void {
    this.users = this.taskService.getUsers()
  }

  handleOpenSnackBar(message: string) {
    this.snackBar.open(message, 'DISMISS')
  }
  handleCreateNewProfile() {
    this.auth.register(this.email, this.password)
  }
  handleSignIn() {
    this.auth.signIn(this.email, this.password)
  }
  handleSignInWithGoogle() {
    this.auth.signInWithGoogle()
  }
  handleSubmit(action: string, form: NgForm) {
    if (this.email == '') {
      this.handleOpenSnackBar('Please, enter email')
      return
    }
    if (this.password == '') {
      this.handleOpenSnackBar('Please, enter password')
      return
    }
    if (action == 'createNewProfile') {
      this.handleCreateNewProfile()
    }
    if (action == 'signIn') {
      this.handleSignIn()
    }
    form.resetForm()
  }




  // handleSubmit(userLoginForm: NgForm, action: any) {
  //   if (userLoginForm.valid) {
  //     if (action == "createNewProfile") {
  //       this.handleCreateNewProfile(userLoginForm, userLoginForm.value)
  //     }
  //     else if (action == "signIn") {
  //       this.handleSignIn(userLoginForm, userLoginForm.value)
  //     }
  //   }
  //   else this.handleOpenSnackBar('Incorrect username or/and password!')
  // }
  // handleCreateNewProfile(userLoginForm: NgForm, values: User) {
  //   for (let user of this.users) {
  //     if (user.username === values.username) {
  //       return this.handleOpenSnackBar('Username is already taken!')
  //     }
  //   }
  //   this.users.push(values)
  //   this.taskService.updateUsers(this.users)
  //   userLoginForm.resetForm()
  //   this.handleOpenSnackBar('Successfully created new profile.')
  // }
  // handleSignIn(userLoginForm: NgForm, values: User) {
  //   if (this.users.length > 0) {
  //     let throwError = true
  //     for (let user of this.users) {
  //       if (user.username === values.username) {
  //         if (user.password === values.password) {
  //           throwError = false
  //           userLoginForm.resetForm()
  //           this.taskService.logInUser(user.username)
  //           window.location.reload()
  //           break
  //         }
  //       }
  //     }
  //     if (throwError) this.handleOpenSnackBar('Incorrect username or/and password!')
  //   }
  //   else this.handleOpenSnackBar('Incorrect username or/and password!')
  // }
}