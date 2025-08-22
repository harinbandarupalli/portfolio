import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  public getContent(): Observable<any> {
    return this.http.get('/assets/content.json');
  }
}
