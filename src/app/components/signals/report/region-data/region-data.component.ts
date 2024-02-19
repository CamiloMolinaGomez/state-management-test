import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
} from '@angular/core';
import { ReportsService } from '../../../../services/signals/reports.service';
import { RegionsService } from '../../../../services/signals/regions.service';

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

  // Signals
  public regionSelected = this.regionsService.regionSelected;

  public date = this.reportsService.date;
  public currentPage = this.reportsService.regionsCurrentPage;
  public lastPage = this.reportsService.regionsLastPage;
  public regionDetails = this.reportsService.regionDetails;
  public loadingIndicator = this.reportsService.regionsLoadingIndicator;

  // computed
  public pagination = computed(() =>
    Array(this.lastPage())
      .fill(0)
      .map((_, i) => i + 1)
  );

  public regionTitle = computed(() =>
    this.regionSelected()
      ? `${this.regionSelected()!.name} report`
      : 'Region report'
  );

  public disablePrevPaginationBtn = computed(
    () => this.currentPage() == 1 || this.loadingIndicator()
  );

  public disableNextPaginationBtn = computed(
    () => this.currentPage() === this.lastPage() || this.loadingIndicator()
  );

  public emptyTableMessage = computed(() =>
    this.loadingIndicator() ? 'Loading...' : 'No data available'
  );

  constructor(
    private reportsService: ReportsService,
    private regionsService: RegionsService
  ) {
    effect(
      () => {
        if (this.regionSelected() && this.date()) {
          this.getRegionDetails(this.currentPage());
        }
      },
      { allowSignalWrites: true }
    );
  }

  public getRegionDetails(page: number) {
    this.reportsService.getRegionDetails(
      this.date(),
      page,
      this.regionSelected()!.iso
    );
  }

  public changeRegionReportPage(page: number) {
    if (page < 1 || page > this.lastPage()) return;
    this.currentPage.set(page);
  }
}
