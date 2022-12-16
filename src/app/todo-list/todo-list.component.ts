import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
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
    // console.log("test")
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }
  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero.id).subscribe();
  // }

}