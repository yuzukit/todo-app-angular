import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { CategoryService } from '../category.service';
import { ValueCreateTodo, States } from '../models/todo';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewValueCategory } from '../models/category';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss']
})
export class TodoUpdateComponent {
  // @Input() todo: ViewValueTodo;
  todoForm:   FormGroup;
  categories: ViewValueCategory[] = [];
  states:     States[] = [];
  todo:       ValueCreateTodo;

  constructor(
    private route:           ActivatedRoute,
    private todoService:     TodoService,
    private categoryService: CategoryService,
    private location:        Location
  ) {
    this.todoForm = new FormGroup({
      category_id:   new FormControl(null, Validators.required),
      title:         new FormControl(null, Validators.required),
      body:          new FormControl(null, Validators.required),
      state:         new FormControl(null, Validators.required)
    });
    this.todo = this.todoForm.value
  }

  ngOnInit(): void {
    this.getTodo();
    this.getStates();
    this.getCategories();
  }
  
  getTodo(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id)
      .subscribe(todo => {
        this.todo = todo;
        this.todoForm.setValue({
          category_id:   this.todo.category_id,
          title:         this.todo.title,
          body:          this.todo.body,
          state:         this.todo.state
        });
      });
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getStates(): void {
    this.todoService.getStates()
      .subscribe(states => {
        this.states = states;
        console.log(states);
      });
  }
   
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.todoForm.invalid) {
      return;
    }
    this.todo = this.todoForm.value;
    if (this.todo) {
      this.todoService.updateTodo(this.todo, Number(this.route.snapshot.paramMap.get('id')))
        .subscribe();
    }
  }
  
}
