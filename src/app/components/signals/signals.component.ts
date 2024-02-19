import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DateComponent } from './filters/date/date.component';
import { ProvinceComponent } from './filters/province/province.component';
import { RegionComponent } from './filters/region/region.component';
import { ReportComponent } from './report/report.component';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [RegionComponent, ProvinceComponent, DateComponent, ReportComponent],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {}
