import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
} from '@angular/core';
import { ProvincesService } from '../../../../services/behavior-subject/provinces.service';
import { ReportsService } from '../../../../services/behavior-subject/reports.service';
import { BehaviorSubject } from 'rxjs';

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
  public provinceSelected$ = this.provincesService.provinceSelected$;
  public provinceData$ = this.reportsService.provinceDetails$;
  public date$ = this.reportsService.date$;
  public currentPage$ = this.reportsService.provinceCurrentPage$;

  public provinceTitle$ = new BehaviorSubject<string>('Province report');
  // Computed
  // public provinceTitle = computed(() =>
  //   this.provinceSelected()
  //     ? `Cities of ${this.provinceSelected()!.province}`
  //     : 'Province report'
  // );

  constructor(
    private provincesService: ProvincesService,
    private reportsService: ReportsService
  ) {
    this.provinceSelected$.subscribe((province) => {
      if (province) {
        this.provinceTitle$.next(`Cities of ${province.province}`);
        if (this.date$.value) {
          this.getRegionDetails(this.currentPage$.value);
        }
      } else {
        this.provinceTitle$.next('Province report');
      }
    });
    // effect(
    //   () => {
    //     if (this.provinceSelected() && this.date()) {
    //       this.getRegionDetails(this.currentPage());
    //     }
    //   },
    //   { allowSignalWrites: true }
    // );
  }

  public getRegionDetails(page: number): void {
    if (page < 1) return;
    this.reportsService.getProvinceDetails(
      this.date$.value!,
      page,
      this.provinceSelected$.value!.iso,
      this.provinceSelected$.value!.province
    );
  }
}
