import { Injectable } from "@angular/core";
import { GenericResponse } from "../common/response/generic-response";
import { PostModel } from "../common/model/post/post-model";
import { PostService } from "../service/post-service";

@Injectable({
  providedIn: 'root'
})

export class PostPipe {

    constructor(private postService: PostService) {
    }

    createPost(postModel: PostModel) {

        console.log("Mapper")
        this.postService.createPost(postModel).subscribe(
            (res: GenericResponse) => {
                if (res.statusCode == 200) {
                    postModel.postId = res.objectId;
                } else {
                    alert("Ya Existe");
                }
            },
            (error: string) => {
                alert("Ocurrió un error al procesar la solicitud " + error);
            });
    }
}