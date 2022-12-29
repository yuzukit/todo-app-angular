import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ValueCreateTodo, ViewValueTodo, States } from './models/todo';
import { FormGroup } from '@angular/forms';
import { Base } from './models/base';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TodoService extends Base {

  getStates(): Observable<States[]> {
    return this.http.get<States[]>(`${this.baseUrl}/todo/state`)
      .pipe(
        tap(_ => this.log('fetched states')),
        catchError(this.handleError<States[]>('getStates', []))
      );
  }

  /** サーバーからTODOを取得する */
  getTodos(): Observable<ViewValueTodo[]> {
    return this.http.get<ViewValueTodo[]>(`${this.baseUrl}/todo/list/json`)
      .pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError<ViewValueTodo[]>('getTodos', []))
      );
  }

  getTodo(id: number): Observable<ValueCreateTodo> {
    return this.http.get<ValueCreateTodo>(`${this.baseUrl}/todo/list/json/${id}`, this.httpOptions)
      .pipe(
        tap(todo => this.log('fetched todo')),
        catchError(this.handleError<ValueCreateTodo>('getTodo'))
      );
  }

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
    ) { 
      super();
    }

  add(body: ValueCreateTodo): Observable<ValueCreateTodo> {
    return this.http.post<ValueCreateTodo>(`${this.baseUrl}/todo/save`, JSON.stringify(body), this.httpOptions)
    .pipe(
      tap(_ => window.location.reload()),
      catchError(this.handleError<ValueCreateTodo>('addTodo', body))
    );
  }

  deleteTodo(id: number): Observable<ViewValueTodo> {
    return this.http.delete<ViewValueTodo>(`${this.baseUrl}/todo/delete/${id}`)
    .pipe(
      tap(_ => {
        this.log(`deleted todo id=${id}`);
        window.location.reload();
      }),
      catchError(this.handleError<ViewValueTodo>('deleteTodo'))
    );
  }
  
  updateTodo(body: ValueCreateTodo, id: number): Observable<ValueCreateTodo> {
    return this.http.put<ValueCreateTodo>(`${this.baseUrl}/todo/update/${id}`, body, this.httpOptions)
    .pipe(
      tap(_ => {
        this.log(`updated todo id=${id}`);
        this.router.navigate(['/todo/list'])
      }),
      catchError(this.handleError<ValueCreateTodo>('updateTodo'))
    )
  }
}
