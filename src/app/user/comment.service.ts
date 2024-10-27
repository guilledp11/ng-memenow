import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, shareReplay } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class CommentService {
    constructor(private http: HttpClient) {
    }

    getComments(memeId: number): Observable<any> {
        return this.http.get("http://localhost:8080/api/comments/" + memeId + "/all");
    }

    addComment(memeId: number, responseTo: number | null, content: string) : Observable<any> {
        let request = {
            "responseToId" : responseTo,
            "text" : content,
            "memeId" : memeId
        };
        return this.http.post("http://localhost:8080/api/comments/create", request);
    }

    deleteComment(commentId: number) : Observable<any> {
        return this.http.delete("http://localhost:8080/api/comments/delete/" + commentId);
    }

    toggleLikeComment(commentId: number) : Observable<boolean> {
        return this.http.patch<boolean>("http://localhost:8080/api/comments/toggle-like/" + commentId, null);
    }

}