import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../../../services/behavior-subject/reports.service';

@Component({
  selector: 'app-active-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-data.component.html',
  styleUrl: './active-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveDataComponent {
  // behavior subject
  public regionSummary$ = this.reportsService.regionSummary$;
  public loadingIndicator$ = this.reportsService.regionSummaryLoadingIndicator$;

  constructor(private reportsService: ReportsService) {}
}
