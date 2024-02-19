import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { RegionDataComponent } from './region-data/region-data.component';
import { ProvinceDataComponent } from './province-data/province-data.component';
import { DeathsDataComponent } from './deaths-data/deaths-data.component';
import { ConfirmedDataComponent } from './confirmed-data/confirmed-data.component';
import { ActiveDataComponent } from './active-data/active-data.component';
import { RegionsService } from '../../../services/signals/regions.service';
import { ReportsService } from '../../../services/signals/reports.service';

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
  public selectedRegion = this.regionsService.regionSelected;
  
  public date = this.reportsService.date;

  constructor(
    private regionsService: RegionsService,
    private reportsService: ReportsService
  ) {
    effect(
      () => {
        if (this.selectedRegion() && this.date()) {
          this.reportsService.getRegionSumary(
            this.date(),
            this.selectedRegion()!.iso
          );
        }
      },
      { allowSignalWrites: true }
    );
  }
}
