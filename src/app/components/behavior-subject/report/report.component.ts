import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveDataComponent } from './active-data/active-data.component';
import { RegionsService } from '../../../services/behavior-subject/regions.service';
import { ReportsService } from '../../../services/behavior-subject/reports.service';
import { ConfirmedDataComponent } from './confirmed-data/confirmed-data.component';
import { DeathsDataComponent } from './deaths-data/deaths-data.component';
import { RegionDataComponent } from './region-data/region-data.component';
import { ProvinceDataComponent } from './province-data/province-data.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegionDataComponent,
    ProvinceDataComponent,
    DeathsDataComponent,
    ConfirmedDataComponent,
    ActiveDataComponent,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {
  // signals
  public selectedRegion$ = this.regionsService.regionSelected$;
  public date$ = this.reportsService.date$;

  constructor(
    private regionsService: RegionsService,
    private reportsService: ReportsService
  ) {
    this.selectedRegion$.subscribe((region) => {
      if (region && this.date$.value) {
        this.reportsService.getRegionSummary(this.date$.value, region.iso);
      }
    })
  }
}
