import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'auth/login', component: LoginComponent },
  { path: '**', redirectTo: 'tasks' }, // wildcard fallback
];
