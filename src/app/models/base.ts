import { Observable, of } from "rxjs";


export class Base {
    protected baseUrl = 'http://localhost:9000';
    
    protected handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: リモート上のロギング基盤にエラーを送信する
          console.error(error); // かわりにconsoleに出力
    
          // 空の結果を返して、アプリを持続可能にする
          return of(result as T);
        };
      }
}