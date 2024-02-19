import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReportsService } from '../../../../services/behavior-subject/reports.service';
import { RegionsService } from '../../../../services/behavior-subject/regions.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-region-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './region-data.component.html',
  styleUrl: './region-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionDataComponent {
  public regionHeaders = [
    'confirmed',
    'deaths',
    'recovered',
    'province',
    'cities',
  ];

  // Behavior Subjects
  public regionSelected$ = this.regionsService.regionSelected$;

  public date$ = this.reportsService.date$;
  public currentPage$ = this.reportsService.regionsCurrentPage$;
  public lastPage$ = this.reportsService.regionsLastPage$;
  public regionDetails$ = this.reportsService.regionDetails$;
  public loadingIndicator$ = this.reportsService.regionsLoadingIndicator$;

  // computed
  public pagination$ = new BehaviorSubject<number[]>([]);
  public regionTitle$ = new BehaviorSubject<string>('Region report');
  public disablePrevPaginationBtn$ = new BehaviorSubject<boolean>(false);
  public disableNextPaginationBtn$ = new BehaviorSubject<boolean>(false);
  public emptyTableMessage$ = new BehaviorSubject<string>('No data available');

  constructor(
    private reportsService: ReportsService,
    private regionsService: RegionsService
  ) {
    this.regionSelected$.subscribe((region) => {
      if (region) {
        this.regionTitle$.next(`${region.name} report`);
        if (this.date$.value) {
          this.getRegionDetails(this.currentPage$.value);
        }
      } else {
        this.regionTitle$.next('Region report');
      }
    });

    this.currentPage$.subscribe((page) => {
      if (page === 1) {
        this.disablePrevPaginationBtn$.next(true);
      }
      if (page === this.lastPage$.value) {
        this.disableNextPaginationBtn$.next(true);
      }
    });

    this.loadingIndicator$.subscribe((loading) => {
      if (loading) {
        this.disablePrevPaginationBtn$.next(true);
        this.disableNextPaginationBtn$.next(true);
        this.emptyTableMessage$.next('Loading...');
      } else {
        this.emptyTableMessage$.next('No data available');
      }
    });

    this.lastPage$.subscribe((lastPage) => {
      if (lastPage > 1) {
        this.pagination$.next(
          Array(lastPage)
            .fill(0)
            .map((_, i) => i + 1)
        );
      }
    });
  }

  public getRegionDetails(page: number) {
    this.reportsService.getRegionDetails(
      this.date$.value,
      page,
      this.regionSelected$.value!.iso
    );
  }

  public changeRegionReportPage(page: number) {
    if (page < 1 || page > this.lastPage$.value) return;
    this.currentPage$.next(page);
    this.getRegionDetails(this.currentPage$.value);
  }
}
