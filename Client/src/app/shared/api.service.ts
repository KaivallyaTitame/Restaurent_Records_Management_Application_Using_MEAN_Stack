import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RestaurentData } from '../restaurent-dash/restaurent.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5100/restaurents'; // Base URL for the API

  constructor(private _http: HttpClient) {}

  postRestaurent(data: RestaurentData): Observable<RestaurentData> {
    return this._http.post<RestaurentData>(this.baseUrl, data).pipe(
      catchError((error) => {
        console.error('Error occurred while adding a restaurant:', error);
        return of({} as RestaurentData);
      })
    );
  }

  getRestaurent(): Observable<RestaurentData[]> {
    return this._http.get<RestaurentData[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching restaurants:', error);
        return of([]);
      })
    );
  }

  deleteResto(id: string): Observable<void> {
    return this._http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred while deleting a restaurant:', error);
        return of();
      })
    );
  }

  updateRestaurant(id: string, data: RestaurentData): Observable<RestaurentData> {
    return this._http.put<RestaurentData>(`${this.baseUrl}/${id}`, data).pipe(
      catchError((error) => {
        console.error('Error occurred while updating a restaurant:', error);
        return of({} as RestaurentData);
      })
    );
  }
}
