import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HomePostPage } from './page/home-post-page/home-post-page';

@Component({
  selector: 'app-root',
  imports:
    [
      RouterOutlet,
      ReactiveFormsModule,
      HomePostPage,
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }