import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, shareReplay } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class VisualizationGroupsService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<any> {
        return this.http.get<any[]>("http://localhost:8080/api/visualization-groups/getAll");
    }

    getElement(id: number): Observable<any | undefined> {
        return this.http.get<any[]>("http://localhost:8080/api/visualization-groups/get/" + id);
    }

    saveElement(element: any): Observable<any | undefined> {
        alert("entra");
        if (element.id == 0 || element.id == null) {
            return this.http.post<any>("http://localhost:8080/api/visualization-groups/create", element);
        } else {
            return this.http.put<any>("http://localhost:8080/api/visualization-groups/update/" + element.id, element);
        }
    }
    
    deleteElement(id: number): Observable<any | undefined> {
        return this.http.delete<any>("http://localhost:8080/api/visualization-groups/delete/" + id);
    }

}