import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../../../services/behavior-subject/reports.service';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent {
  // Signals
  public date$ = this.reportsService.date$;

  constructor(private reportsService: ReportsService) {}

  public selectDate(date: string): void {
    this.date$.next(date);
  }
}
