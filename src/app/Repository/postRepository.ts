import { Observable } from "rxjs";
import { PostModel } from "../common/model/post/post-model";
import { GenericResponse } from "../common/response/generic-response";

export abstract class PostRepository {
    abstract createPost(postModel: PostModel): Observable<GenericResponse>;
    abstract readPostName(params: { productName: string }): Observable<GenericResponse>;
}