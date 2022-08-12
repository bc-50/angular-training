import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http.post<{ name: string }>('https://ng-complete-guide-72adc-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseData => {
      console.log(responseData);
    }, err => {
      this.error.next(err.message);
    });
  }

  fetchPost() {
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-72adc-default-rtdb.firebaseio.com/posts.json')
      .pipe(map((resData) => {
        const postsArray: Post[] = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            postsArray.push({ ...resData[key], id: key });
          }
        }
        return postsArray;
      }),
        catchError(errRes => {
          return throwError(errRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete("https://ng-complete-guide-72adc-default-rtdb.firebaseio.com/posts.json", {
      observe: 'events'
    }).pipe(tap(ev => { console.log(ev); }));
  }
}