import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://dpg.gg/test';

  constructor(private http: HttpClient) { }

  getCalendarData(): Observable<any> {
    const url = `${this.baseUrl}/calendar.json`;
    return this.http.get(url);
  }
}
