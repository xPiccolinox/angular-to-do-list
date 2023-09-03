import { Component, OnInit } from '@angular/core';
import { TaskDashboardService } from '../../task-dashboard.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.interface';
import { FirebaseService } from 'src/app/shared/firebase.service';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})

export class UserLoginComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private taskService: TaskDashboardService,
    private firebase: FirebaseService
  ) {}

  hide = true;
  users: User[] = []
  email: string = ''
  password: string = ''

  ngOnInit(): void {
    // this.users = this.taskService.getUsers()
  }

  handleOpenSnackBar(message: string) {
    this.snackBar.open(message, 'DISMISS')
  }
  handleCreateNewProfile() {
    this.firebase.createUser(this.email, this.password)
  }
  handleSignIn() {
    this.firebase.signIn(this.email, this.password)
  }
  handleSignInWithGoogle() {
    this.firebase.signInWithGoogle()
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
}