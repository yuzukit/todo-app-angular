import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { ValueCreateCategory } from '../models/category';
import { ViewValueTodo } from '../models/todo';
import { TodoService } from '../todo.service';
import { HasSubscription } from '../models/hasSubscription';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent extends HasSubscription implements OnInit {
  todos:         ViewValueTodo[] = [];
  selectedTodo?: ViewValueTodo;

  constructor(private todoService: TodoService) {
    super();
  }

  getTodos(): void {
    this.subscriptions.push(
      this.todoService.getTodos()
          .subscribe(todo => {
            this.todos = todo;
          })
    );
  }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  deleteTodo(todo: ViewValueTodo): void {
    this.subscriptions.push(
      this.todoService.deleteTodo(todo.id).subscribe(response =>
        console.log(response))
    );
  }
}