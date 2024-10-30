import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class NotificationService {

    constructor(private http: HttpClient) {
    }

    getNumUnreadNotifications() : Observable<any> {
        return this.http.get("http://localhost:8080/api/notifications/num-unread");
    }

    getInbox(pageNum: number, pageSize: number) : Observable<any> {
        let params = new HttpParams()
        .set('pageNum', pageNum.toString())
        .set('pageSize', pageSize.toString());
        return this.http.get("http://localhost:8080/api/notifications/inbox", {params});
    }
}