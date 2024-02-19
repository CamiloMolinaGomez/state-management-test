import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Province } from '../../interfaces/province';
import { Observable, filter, map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProvincesService {
  // Signals
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(10);
  public lastPage = signal<number>(1);
  public provinces = signal<Province[]>([]);
  public provinceSelected = signal<Province | undefined>(undefined);

  constructor(private http: HttpClient) {}

  public getProvinces$(regionIso: string): Observable<Province[]> {
    const url = `provinces/${regionIso}?page=${this.currentPage()}&per_page=${this.itemsPerPage()}`;

    return this.http.get<ApiResponse<Province[]>>(url).pipe(
      map((response: ApiResponse<Province[]>) => {
        this.lastPage.set(response.last_page);
        const responseData = response.data.filter(
          (province) => province.province
        );
        return responseData;
      })
    );
  }

  public getProvinces(regionIso: string, page: number): void {
    this.currentPage.set(page);
    this.getProvinces$(regionIso).subscribe((data: Province[]) => {
      if (page === 1) {
        this.provinces.set(data);
      } else {
        this.provinces.update((provinces) => [...provinces, ...data]);
      }
    });
  }

  public clearProvinces(): void {
    this.provinces.set([]);
    this.currentPage.set(1);
  }
}
