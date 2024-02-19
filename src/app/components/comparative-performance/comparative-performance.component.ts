import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAComponent } from './panel-a/panel-a.component';
import { PanelBComponent } from './panel-b/panel-b.component';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
    selector: 'app-comparative-performance',
    standalone: true,
    imports: [
      CommonModule,
      PanelAComponent,
      PanelBComponent,
      HighlightDirective,
    ],
    templateUrl: './comparative-performance.component.html',
    styleUrl: './comparative-performance.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class ComparativePerformanceComponent {
    changeDetection() {
      console.log('App Component Change Detection');
      return true;
    }
  }
  