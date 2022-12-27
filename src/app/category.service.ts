import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ViewValueCategory } from './models/category';
import { Base } from './models/base';

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends Base {

  /** サーバーからTODOを取得する */
  getCategories(): Observable<ViewValueCategory[]> {
    return this.http.get<ViewValueCategory[]>(`${this.baseUrl}/category/list/json`)
      .pipe(
        tap(todos => this.log('fetched todos')),
        catchError(this.handleError<ViewValueCategory[]>('getTodos', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 
      super();
    }

}
