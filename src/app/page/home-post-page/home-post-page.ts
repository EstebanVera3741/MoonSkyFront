import { Component } from '@angular/core';
import { Post } from '../../component/post/post';

@Component({
  selector: 'app-home-post-page',
  imports: 
  [
    Post,
  ],
  templateUrl: './home-post-page.html',
  styleUrl: './home-post-page.css',
})
export class HomePostPage {

}
