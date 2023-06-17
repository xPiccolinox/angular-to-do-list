import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/containers/task-dashboard/task-dashboard.component';
import { UserLoginComponent } from './task-dashboard/containers/user-login/user-login.component';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'dashboard', component: TaskDashboardComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
