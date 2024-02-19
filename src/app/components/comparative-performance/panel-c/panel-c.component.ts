import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HighlightDirective } from '../../../directives/highlight.directive';


@Component({
  selector: 'app-panel-c',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './panel-c.component.html',
  styleUrl: './panel-c.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelCComponent {
  mysignal = signal(1);

  constructor() {
    setTimeout(() => setInterval(() => this.changeSignalValue(), 1500), 1000);
  }

  changeSignalValue() {
    this.mysignal.update((value) => value + 1);
  }

  changeDetection() {
    console.log('Panel C Change Detection');
    return true;
  }
}
