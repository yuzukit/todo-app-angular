import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { TodoService } from '../todo.service';
import { ViewValueCategory } from '../models/category';
import { Validators } from '@angular/forms';
import { ValueCreateTodo } from '../models/todo';
import { OverlayKeyboardDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})

export class TodoCreateComponent implements OnInit {

  todoForm:   FormGroup;
  categories: ViewValueCategory[] = [];
  todo:       ValueCreateTodo;
  
  constructor(private categoryService: CategoryService, private todoService: TodoService) {
    this.todoForm = new FormGroup({
      category_id: new FormControl(null, Validators.required),
      title:       new FormControl(null, Validators.required),
      body:        new FormControl(null, Validators.required),
      state:       new FormControl(0)
    });
    this.todo = this.todoForm.value
  }

  getCategories(): void {
    this.categoryService.getCategories()
        .subscribe(category => {
          this.categories = category;
        });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  addTodo(): void {
    this.todo = this.todoForm.value;
    this.todoService.add(this.todo).subscribe(response => {
      console.log(response)
    });
  }

}