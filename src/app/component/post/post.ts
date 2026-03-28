import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostModel } from '../../common/model/post/post-model';
import { PostPipe } from '../../mapper/post-pipe';

@Component({
  selector: 'app-post',
  imports:
    [
      FormsModule,
      ReactiveFormsModule,
    ],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {

  selectedFile!: File;
  postModel!: PostModel;

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private postPipe: PostPipe) {
    this.formGroup = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // 📸 Capturar archivo
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🚀 Guardar meme
  saveMeme() {
    this.postModel = {
      postId: this.formGroup.controls['id'].value,
      postName: this.formGroup.controls['title'].value,
      postDescription: this.formGroup.controls['description'].value,
      postFile: this.selectedFile
    }

    console.log("component")
    this.postPipe.createPost(this.postModel);






  }

  cancel() {
    console.log('Cancelado');
  }
}
