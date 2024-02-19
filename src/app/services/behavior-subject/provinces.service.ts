import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Province } from '../../interfaces/province';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProvincesService {
  // behavior subjects
  public currentPage$ = new BehaviorSubject<number>(1);
  public itemsPerPage$ = new BehaviorSubject<number>(10);
  public lastPage$ = new BehaviorSubject<number>(1);
  public provinces$ = new BehaviorSubject<Province[]>([]);
  public provinceSelected$ = new BehaviorSubject<Province | undefined>(undefined);

  constructor(private http: HttpClient) {}

  public getProvinces$(regionIso: string): Observable<Province[]> {
    const url = `provinces/${regionIso}?page=${this.currentPage$.value}&per_page=${this.itemsPerPage$.value}`;

    return this.http.get<ApiResponse<Province[]>>(url).pipe(
      map((response: ApiResponse<Province[]>) => {
        this.lastPage$.next(response.last_page);
        const responseData = response.data.filter(
          (province) => province.province
        );
        return responseData;
      })
    );
  }

  public getProvinces(regionIso: string, page: number): void {
    this.currentPage$.next(page);
    this.getProvinces$(regionIso).subscribe((data: Province[]) => {
      if (page === 1) {
        this.provinces$.next(data);
      } else {
        this.provinces$.next([...this.provinces$.value, ...data]);
      }
    });
  }

  public clearProvinces(): void {
    this.provinces$.next([]);
    this.currentPage$.next(1);
  }
}
