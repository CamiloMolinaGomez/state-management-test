import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
} from '@angular/core';
import { ProvincesService } from '../../../../services/signals/provinces.service';
import { ReportsService } from '../../../../services/signals/reports.service';

@Component({
  selector: 'app-province-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './province-data.component.html',
  styleUrl: './province-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvinceDataComponent {
  public provinceHeaders = ['city', 'fips', 'confirmed', 'deaths'];

  // Signals
  public provinceSelected = this.provincesService.provinceSelected;
  public provinceData = this.reportsService.provinceDetails;
  public date = this.reportsService.date;
  public currentPage = this.reportsService.provinceCurrentPage;

  // Computed
  public provinceTitle = computed(() =>
    this.provinceSelected()
      ? `Cities of ${this.provinceSelected()!.province}`
      : 'Province report'
  );

  constructor(
    private provincesService: ProvincesService,
    private reportsService: ReportsService
  ) {
    effect(
      () => {
        if (this.provinceSelected() && this.date()) {
          this.getRegionDetails(this.currentPage());
        }
      },
      { allowSignalWrites: true }
    );
  }

  public getRegionDetails(page: number): void {
    if (page < 1) return;
    this.reportsService.getProvinceDetails(
      this.date()!,
      page,
      this.provinceSelected()!.iso,
      this.provinceSelected()!.province
    );
  }
}
