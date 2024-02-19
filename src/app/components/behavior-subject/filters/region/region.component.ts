import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegionsService } from '../../../../services/behavior-subject/regions.service';
import { ProvincesService } from '../../../../services/behavior-subject/provinces.service';
import { ReportsService } from '../../../../services/behavior-subject/reports.service';

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionComponent {
  // behavior subjects
  public regions$ = this.regionsService.regions$;
  public currentPage$ = this.regionsService.currentPage$;
  public itemsPerPage$ = this.regionsService.itemsPerPage$;
  public lastPage$ = this.regionsService.lastPage$;
  public regionSelected$ = this.regionsService.regionSelected$;

  constructor(
    private regionsService: RegionsService,
    private provincesService: ProvincesService,
    private reportsService: ReportsService
  ) {
    this.getRegions(this.currentPage$.value);
  }

  public getRegions(page: number): void {
    if (page < 1 || page > this.lastPage$.value) return;
    this.regionsService.getRegions(page);
  }

  public selectRegion(regionIso: string): void {
    const regionSelected = this.regionsService
      .regions$.value
      .find((r) => r.iso === regionIso);
    this.regionsService.regionSelected$.next(regionSelected);
    this.provincesService.clearProvinces();
    this.reportsService.clearRegionsDataTable();
  }

  public onScroll(event: Event): void {
    const target = event.target as HTMLInputElement;
    let { offsetHeight, scrollTop, scrollHeight } = target;

    if (offsetHeight + scrollTop >= scrollHeight) {
      this.getRegions(this.currentPage$.value + 1);
    }
  }
}
