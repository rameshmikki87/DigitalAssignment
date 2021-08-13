import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Users, Post, Comment } from './model';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private apiURL = "https://jsonplaceholder.typicode.com";
  constructor(private httpClient: HttpClient) { }
  getUers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.apiURL + '/users')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/posts')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getComments(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.apiURL + '/posts/' + postId + '/comments')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
