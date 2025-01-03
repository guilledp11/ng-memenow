import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, shareReplay } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class MemeService {
    constructor(private http: HttpClient) {
    }

    save(meme:any): Observable<any> {
        return this.http.post("http://localhost:8080/api/memes/create", meme);
    }

    delete(id:number): Observable<any> {
        return this.http.delete("http://localhost:8080/api/memes/delete/" + id);
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

    toggleLikeMeme(memeId: number) : Observable<boolean> {
        return this.http.patch<boolean>("http://localhost:8080/api/memes/toggle-like/" + memeId, null);
    }

    timeline(pageNum: number, pageSize: number, initMoment: Date) : Observable<any> {
        let params = new HttpParams()
            .set('following', true)
            .set('initMoment', initMoment.getTime())
            .set('pageNum', pageNum.toString())
            .set('pageSize', pageSize.toString());
        return this.http.get("http://localhost:8080/api/memes/timeline", { params});
    }
}