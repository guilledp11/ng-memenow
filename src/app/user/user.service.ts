import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, shareReplay } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    searchUsers(pageNum: number, pageSize: number, query: string, exclude: any[]): Observable<any> {
        let params = new HttpParams()
            .set('pageNum', pageNum.toString())
            .set('pageSize', pageSize.toString())
            .set('searchQuery', query);

        exclude.forEach(val => {
            params = params.append('exclude', val.id);
        });

        return this.http.get<any[]>("http://localhost:8080/api/users/search", { params });
    }

    findLoggedUser(): Observable<any> {
        return this.http.get("http://localhost:8080/api/users/self");
    }

    findLoggedUserImage(): Observable<Blob> {
        return this.http.get("http://localhost:8080/api/users/self/profile-pic", { responseType: 'blob' });
    }

    findUserPosts(pageNum: number, pageSize: number, userId: number): Observable<any> {
        let params = new HttpParams()
            .set('pageNum', pageNum.toString())
            .set('pageSize', pageSize.toString());
        return this.http.get("http://localhost:8080/api/memes/user/" + userId, { params });
    }

    findMediaByMemeId(memeId: number): Observable<Blob> {
        return this.http.get("http://localhost:8080/api/memes/get/media/" + memeId, { responseType: 'blob' });
    }

}