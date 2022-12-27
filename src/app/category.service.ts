import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Color, ValueCreateCategory, ViewValueCategory } from './models/category';
import { Base } from './models/base';
import { Router } from '@angular/router';

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

  getCategory(id: number): Observable<ValueCreateCategory> {
    return this.http.get<ValueCreateCategory>(`${this.baseUrl}/category/list/json/${id}`, this.httpOptions)
    .pipe(
      tap(_ => this.log('fetched category')),
      catchError(this.handleError<ValueCreateCategory>('getCategory'))
    )
  }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${this.baseUrl}/category/color`)
    .pipe(
      tap(_ => this.log('fetched colors')),
      catchError(this.handleError<Color[]>('getColors', []))
    )
  }

  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`);
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

  add(body: ValueCreateCategory): Observable<ValueCreateCategory> {
    return this.http.post<ValueCreateCategory>(`${this.baseUrl}/category/save`, JSON.stringify(body), this.httpOptions)
    .pipe(
      tap(_ => window.location.reload()),
      catchError(this.handleError<ValueCreateCategory>('addCategory', body))
    );
  }

  deleteCategory(id: number): Observable<ViewValueCategory> {
    return this.http.delete<ViewValueCategory>(`${this.baseUrl}/category/delete/${id}`)
    .pipe(
      tap(_ => {
        this.log(`deleted category id=${id}`);
        window.location.reload();
      }),
      catchError(this.handleError<ViewValueCategory>('deleteCategory'))
    );
  }
  
  updateCategory(body: ValueCreateCategory, id: number): Observable<ValueCreateCategory> {
    return this.http.put<ValueCreateCategory>(`${this.baseUrl}/category/update/${id}`, body, this.httpOptions)
    .pipe(
      tap(_ => {
        this.log(`updated category id=${id}`);
        this.router.navigate(['/category/list']);
      }),
      catchError(this.handleError<ValueCreateCategory>('updateCategory'))
    )
  }
}
