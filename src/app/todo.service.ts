import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ValueCreateTodo, ViewValueTodo } from './models/todo';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private baseUrl = 'http://localhost:9000';

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   *
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** サーバーからTODOを取得する */
  getTodos(): Observable<ViewValueTodo[]> {
    return this.http.get<ViewValueTodo[]>(`${this.baseUrl}/todo/list/json`)
      .pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError<ViewValueTodo[]>('getTodos', []))
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
    private messageService: MessageService) { }

  add(body: ValueCreateTodo): Observable<ValueCreateTodo> {
    //console.log(JSON.stringify(body), `${this.baseUrl}/todo/save`);
    return this.http.post<ValueCreateTodo>(`${this.baseUrl}/todo/save`, JSON.stringify(body), this.httpOptions)
    .pipe(
      tap(_ => window.location.href = 'http://localhost:4200/todo/list'),
      catchError(this.handleError<ValueCreateTodo>('addTodo', body))
    );
  }

  deleteTodo(id: number): Observable<ViewValueTodo> {
    return this.http.delete<ViewValueTodo>(`${this.baseUrl}/todo/delete/${id}`)
    .pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<ViewValueTodo>('deleteTodo'))
    );
  }
  

}
