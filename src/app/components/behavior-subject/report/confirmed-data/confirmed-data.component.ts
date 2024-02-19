import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../../../services/behavior-subject/reports.service';

@Component({
  selector: 'app-confirmed-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmed-data.component.html',
  styleUrl: './confirmed-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmedDataComponent {
// behavior subject
public regionSummary$ = this.reportsService.regionSummary$;
public loadingIndicator$ = this.reportsService.regionSummaryLoadingIndicator$;

constructor(private reportsService: ReportsService) {}
}
