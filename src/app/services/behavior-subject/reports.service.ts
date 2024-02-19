import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { Region, RegionDetails } from '../../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  // behavior subjects
  public date$ = new BehaviorSubject('2022-06-06');
  public regionsCurrentPage$ = new BehaviorSubject<number>(1);
  public regionsItemsPerPage$ = new BehaviorSubject<number>(10);
  public regionsLastPage$ = new BehaviorSubject<number>(1);
  public regionDetails$ = new BehaviorSubject<RegionDetails[]>([]);
  public regionsLoadingIndicator$ = new BehaviorSubject<boolean>(false);

  public provinceCurrentPage$ = new BehaviorSubject<number>(1);
  public provinceItemsPerPage$ = new BehaviorSubject<number>(10);
  public provinceLastPage$ = new BehaviorSubject<number>(1);
  public provinceDetails$ = new BehaviorSubject<Region | undefined>(undefined);
  public provinceLoadingIndicator$ = new BehaviorSubject<boolean>(false);

  public regionSummary$ = new BehaviorSubject<RegionDetails | undefined>(undefined);
  public regionSummaryLoadingIndicator$ = new BehaviorSubject<boolean>(false);

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
    const url = `reports?date=${date}&page=${page}&per_page=${this.regionsItemsPerPage$.value}&&iso=${iso}`;

    return this.http.get<ApiResponse<RegionDetails[]>>(url).pipe(
      filter(
        (response: ApiResponse<RegionDetails[]>) =>
          response.data && response.data.length > 0
      ),
      map((response: ApiResponse<RegionDetails[]>) => {
        this.regionsLastPage$.next(response.last_page);
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
    const url = `reports?date=${date}&page=${page}&per_page=${this.provinceItemsPerPage$.value}&iso=${iso}&region_province=${provinceName}`;

    return this.http.get<ApiResponse<RegionDetails[]>>(url).pipe(
      filter(
        (response: ApiResponse<RegionDetails[]>) =>
          response.data && response.data.length > 0
      ),
      map((response: ApiResponse<RegionDetails[]>) => {
        this.provinceLastPage$.next(response.last_page);
        return response.data;
      })
    );
  }

  public getRegionSummary(date: string, iso: string): void {
    this.regionSummaryLoadingIndicator$.next(true);
    this.regionSummary$.next(undefined);
    this.getRegionSummary$(date, iso).subscribe((data: RegionDetails) =>{
      this.regionSummary$.next(data);
      this.regionSummaryLoadingIndicator$.next(false);
    });
  }

  public getRegionDetails(date: string, page: number, iso: string): void {
    this.clearRegionsData();
    this.getRegionDetails$(date, page, iso).subscribe(
      (data: RegionDetails[]) => {
        this.regionDetails$.next(data);
        this.regionsLoadingIndicator$.next(false);
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
        this.provinceDetails$.next(data[0].region);
        this.provinceLoadingIndicator$.next(false);
      }
    );
  }

  public clearRegionsData() {
    this.regionDetails$.next([]);
    this.regionsLoadingIndicator$.next(true);
  }

  public clearRegionsDataTable() {
    this.clearRegionsData();
    this.regionsCurrentPage$.next(1);
    this.regionsLastPage$.next(1);
  }

  public clearProvincesData() {
    this.provinceDetails$.next(undefined);
    this.provinceLoadingIndicator$.next(true);
    this.provinceCurrentPage$.next(1);
  }

  public clearProvincesDataTable() {
    this.clearProvincesData();
    this.provinceLastPage$.next(1);
  }
}
