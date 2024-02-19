import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { Region } from '../../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  // Signals
  public currentPage = signal<number>(1);
  public itemsPerPage = signal<number>(10);
  public lastPage = signal<number>(1);
  public regions = signal<Region[]>([]);
  public regionSelected = signal<Region | undefined>(undefined);

  constructor(private http: HttpClient) {}

  private getRegions$(): Observable<Region[]> {
    const url = `regions?page=${this.currentPage()}&per_page=${this.itemsPerPage()}`;

    return this.http.get<ApiResponse<Region[]>>(url).pipe(
      filter(
        (response: ApiResponse<Region[]>) =>
          response.data && response.data.length > 0
      ),
      map((response: ApiResponse<Region[]>) => {
        this.lastPage.set(response.last_page);
        return response.data;
      })
    );
  }

  public getRegions(currentPage: number): void {
    this.currentPage.set(currentPage);
    this.getRegions$().subscribe((data: Region[]) =>
      this.regions.update((regions) => [...regions, ...data])
    );
  }
}
