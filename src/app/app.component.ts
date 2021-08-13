import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { LoadingService } from './loading.service';
import { Users, Post, Comment } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  usersList: Users[] = [];
  allPosts: Post[] = [];
  selectedPosts: Post[] = [];
  commentsList: Comment[] = [];
  activeUserName = '';
  activeUserID = 0;
  activePostID = 0;
  loadAllPostClicked = false;
  constructor(private appService: AppServiceService, public loadingService: LoadingService) { }
  ngOnInit() {
    this.getUsers();
    this.getAllPosts();
  }
  getUsers(): void {
    this.appService.getUers().subscribe(response => {
      if (response) {
        this.usersList = response;
      }
    });
  }
  getAllPosts(): void {
    this.appService.getPosts().subscribe(response => {
      if (response) {
        this.allPosts = response;
      }
    });
  }
  getPosts(id: number, userName: string): void {
    this.loadAllPostClicked = false;
    this.selectedPosts = [];
    this.activeUserName = userName;
    this.activeUserID = id;
    this.selectedPosts = this.allPosts.filter(data => data.userId === id).slice(0, 3);
  }
  loadAllPosts(): void {
    this.loadAllPostClicked = true;
    this.selectedPosts = this.allPosts.filter(data => data.userId === this.activeUserID);
  }
  showComments(postId: number): void {
    this.appService.getComments(postId).subscribe(response => {
      if (response) {
        this.activePostID = postId;
        this.commentsList = response;
      }
    });
  }
  hideComments(): void {
    this.activePostID = 0;
  }
}
