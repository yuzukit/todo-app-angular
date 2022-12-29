import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoUpdateComponent } from './todo-update/todo-update.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';

const routes: Routes = [
  { path: 'todo/list', component: TodoListComponent },
  { path: 'category/list', component: CategoryListComponent },
  { path: 'todo/edit/:id', component: TodoUpdateComponent },
  { path: 'category/edit/:id', component: CategoryUpdateComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
