import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null;
  errSub: Subscription;
  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    this.errSub = this.postService.error.subscribe((err: string) => {
      this.isFetching = false;
      this.error = err;
    })
    this.isFetching = true;
    this.postService.fetchPost().subscribe(res => { this.isFetching = false; this.loadedPosts = res; }, err => {
      this.isFetching = false;
      this.error = err.message;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    // Send Http request
    this.postService.fetchPost().subscribe(res => { this.isFetching = false; this.loadedPosts = res; }, err => {
      this.isFetching = false;
      this.error = err.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.deletePosts().subscribe(res => {
      this.loadedPosts = [];
      this.isFetching = false;
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errSub.unsubscribe();
  }

}
