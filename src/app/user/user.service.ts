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
        
        return this.http.get<any[]>("http://localhost:8080/api/users/search", {params});
    }

    findAllCategories(subcategories: boolean, arrange: boolean): Observable<any> {
        let params = new HttpParams().set("subcategories", subcategories).set("arrange", arrange);
        return this.http.get<any[]>("http://localhost:8080/api/categories/all", { params });
    }

    getElement(id: number): Observable<any | undefined> {
        let params = new HttpParams().set("subcategories", true);
        return this.http.get<any[]>("http://localhost:8080/api/categories/find/" + id, { params });
    }

    saveElement(element: any): Observable<any | undefined> {
        if (element.id == 0 || element.id == null) {
            return this.http.post<any>("http://localhost:8080/api/categories/create", element);
        } else {
            return this.http.put<any>("http://localhost:8080/api/categories/update/" + element.id, element);
        }
    }

    deleteElement(id: number, rearrange: boolean = true): Observable<any | undefined> {
        let params = new HttpParams().set("rearrange", rearrange);
        return this.http.delete<any>("http://localhost:8080/api/categories/delete/" + id, { params });
    }

}