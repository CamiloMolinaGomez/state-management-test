import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { Region } from '../../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  // behavior subjects
  public currentPage$ = new BehaviorSubject<number>(1);
  public itemsPerPage$ = new BehaviorSubject<number>(10);
  public lastPage$ = new BehaviorSubject<number>(1);
  public regions$ = new BehaviorSubject<Region[]>([]);
  public regionSelected$ = new BehaviorSubject<Region | undefined>(undefined);

  constructor(private http: HttpClient) {}

  private getRegions$(): Observable<Region[]> {
    const url = `regions?page=${this.currentPage$.value}&per_page=${this.itemsPerPage$.value}`;

    return this.http.get<ApiResponse<Region[]>>(url).pipe(
      filter(
        (response: ApiResponse<Region[]>) =>
          response.data && response.data.length > 0
      ),
      map((response: ApiResponse<Region[]>) => {
        this.lastPage$.next(response.last_page);
        return response.data;
      })
    );
  }

  public getRegions(currentPage: number): void {
    this.currentPage$.next(currentPage);
    this.getRegions$().subscribe((data: Region[]) =>
      this.regions$.next([...this.regions$.value, ...data])
    );
  }
}
