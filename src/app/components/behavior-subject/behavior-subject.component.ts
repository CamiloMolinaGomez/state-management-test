import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegionComponent } from './filters/region/region.component';
import { ProvinceComponent } from './filters/province/province.component';
import { DateComponent } from './filters/date/date.component';
import { ReportComponent } from './report/report.component';

@Component({
  selector: 'app-behavior-subject',
  standalone: true,
  imports: [RegionComponent, ProvinceComponent, DateComponent, ReportComponent],
  templateUrl: './behavior-subject.component.html',
  styleUrl: './behavior-subject.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BehaviorSubjectComponent {

}
