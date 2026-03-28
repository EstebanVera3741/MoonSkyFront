import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostRepository } from '../Repository/postRepository';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { PostModel } from '../common/model/post/post-model';
import { GenericResponse } from '../common/response/generic-response';

@Injectable({
  providedIn: 'root',
})
export class PostService extends PostRepository {
  private API = 'http://localhost:8080/memes';

  constructor(private http: HttpClient) {
    super();
  }

createPost(postModel: PostModel): Observable<GenericResponse> {
    const formData = new FormData();

    // 1. Agregamos el archivo binario
    if (postModel.postFile) {
      formData.append('file', postModel.postFile);
    }

    // 2. Convertimos los datos a JSON y los envolvemos en un Blob
    // Esto es vital para que Spring Boot lo reciba con @RequestPart
    const postData = {
      title: postModel.postName,
      description: postModel.postDescription
    };

    const jsonBlob = new Blob([JSON.stringify(postData)], {
      type: 'application/json'
    });

    formData.append('post', jsonBlob);

    return this.http.post<GenericResponse>(`${this.API}/save`, formData).pipe(
      tap((res: GenericResponse) => {
        // Usamos 'tap' para acciones que no transforman el chorro de datos
        if (res.statusCode === 200) {
          postModel.postId = res.objectId;
        } else {
          alert("El registro ya existe o hubo un problema");
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en el servidor:', error);
        return throwError(() => new Error(error.message || 'Error en la solicitud'));
      })
    );
  }

  // Implementación básica del buscador por nombre
  readPostName(params: { productName: string }): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.API}/search`, { params });
  }
}