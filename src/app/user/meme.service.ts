import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, shareReplay } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class MemeService {
    constructor(private http: HttpClient) {
    }

    findMediaByMemeId(memeId: number): Observable<Blob> {
        return this.http.get("http://localhost:8080/api/memes/get/media/" + memeId, { responseType: 'blob' });
    }

    findMemeDataById(memeId: number) : Observable<any> {
        return this.http.get("http://localhost:8080/api/memes/get/data/" + memeId, );
    }

    findMediaById(mediaId: number) : Observable<any> {
        return this.http.get("http://localhost:8080/api/media/" + mediaId, { responseType: 'blob' });
    }
}