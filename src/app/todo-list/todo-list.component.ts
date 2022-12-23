import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { ValueCreateCategory } from '../models/category';
import { ViewValueTodo } from '../models/todo';
import { TodoService } from '../todo.service';

// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit {
  todos: ViewValueTodo[] = [];
  selectedTodo?: ViewValueTodo;

  constructor(private todoService: TodoService) {}

  getTodos(): void {
    this.todoService.getTodos()
        .subscribe(todo => {
          this.todos = todo;
        });
  }

  ngOnInit(): void {
    this.getTodos();
  }

  deleteTodo(todo: ViewValueTodo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.todoService.deleteTodo(todo.id).subscribe();
  }
}