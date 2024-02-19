import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { Region, RegionDetails } from '../../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  // Signals
  public date = signal('2022-06-06');
  public regionsCurrentPage = signal<number>(1);
  public regionsItemsPerPage = signal<number>(10);
  public regionsLastPage = signal<number>(1);
  public regionDetails = signal<RegionDetails[]>([]);
  public regionsLoadingIndicator = signal<boolean>(false);

  public provinceCurrentPage = signal<number>(1);
  public provinceItemsPerPage = signal<number>(10);
  public provinceLastPage = signal<number>(1);
  public provinceDetails = signal<Region | undefined>(undefined);
  public provinceLoadingIndicator = signal<boolean>(false);

  public regionSummary = signal<RegionDetails | undefined>(undefined);
  public regionSummaryLoadingIndicator = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  private getRegionSummary$(
    date: string,
    iso: string
  ): Observable<RegionDetails> {
    const url = `reports/total?date=${date}&iso=${iso}`;

    return this.http.get<ApiResponse<RegionDetails>>(url).pipe(
      filter((response: ApiResponse<RegionDetails>) => !!response.data),
      map((response: ApiResponse<RegionDetails>) => {
        return response.data;
      })
    );
  }

  private getRegionDetails$(
    date: string,
    page: number,
    iso: string
  ): Observable<RegionDetails[]> {
    const url = `reports?date=${date}&page=${page}&per_page=${this.regionsItemsPerPage()}&&iso=${iso}`;

    return this.http.get<ApiResponse<RegionDetails[]>>(url).pipe(
      filter(
        (response: ApiResponse<RegionDetails[]>) =>
          response.data && response.data.length > 0
      ),
      map((response: ApiResponse<RegionDetails[]>) => {
        this.regionsLastPage.set(response.last_page);
        return response.data;
      })
    );
  }

  private getProvinceDetails$(
    date: string,
    page: number,
    iso: string,
    provinceName: string
  ): Observable<RegionDetails[]> {
    const url = `reports?date=${date}&page=${page}&per_page=${this.provinceItemsPerPage()}&iso=${iso}&region_province=${provinceName}`;

    return this.http.get<ApiResponse<RegionDetails[]>>(url).pipe(
      filter(
        (response: ApiResponse<RegionDetails[]>) =>
          response.data && response.data.length > 0
      ),
      map((response: ApiResponse<RegionDetails[]>) => {
        this.provinceLastPage.set(response.last_page);
        return response.data;
      })
    );
  }

  public getRegionSumary(date: string, iso: string): void {
    this.regionSummaryLoadingIndicator.set(true);
    this.regionSummary.set(undefined);
    this.getRegionSummary$(date, iso).subscribe((data: RegionDetails) =>{
      this.regionSummary.set(data);
      this.regionSummaryLoadingIndicator.set(false);
    });
  }

  public getRegionDetails(date: string, page: number, iso: string): void {
    this.clearRegionsData();
    this.getRegionDetails$(date, page, iso).subscribe(
      (data: RegionDetails[]) => {
        this.regionDetails.set(data);
        this.regionsLoadingIndicator.set(false);
      }
    );
  }

  public getProvinceDetails(
    date: string,
    page: number,
    iso: string,
    provinceName: string
  ): void {
    this.clearProvincesData();
    this.getProvinceDetails$(date, page, iso, provinceName).subscribe(
      (data: RegionDetails[]) => {
        this.provinceDetails.set(data[0].region);
        this.provinceLoadingIndicator.set(false);
      }
    );
  }

  public clearRegionsData() {
    this.regionDetails.set([]);
    this.regionsLoadingIndicator.set(true);
  }

  public clearRegionsDataTable() {
    this.clearRegionsData();
    this.regionsCurrentPage.set(1);
    this.regionsLastPage.set(1);
  }

  public clearProvincesData() {
    this.provinceDetails.set(undefined);
    this.provinceLoadingIndicator.set(true);
    this.provinceCurrentPage.set(1);
  }

  public clearProvincesDataTable() {
    this.clearProvincesData();
    this.provinceLastPage.set(1);
  }
}
