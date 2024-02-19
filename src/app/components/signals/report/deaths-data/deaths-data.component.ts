import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../../../services/signals/reports.service';

@Component({
  selector: 'app-deaths-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deaths-data.component.html',
  styleUrl: './deaths-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeathsDataComponent {
  // Signals
  public regionSummary = this.reportsService.regionSummary;
  public loadingIndicator = this.reportsService.regionSummaryLoadingIndicator;

  constructor(private reportsService: ReportsService) {}
}
