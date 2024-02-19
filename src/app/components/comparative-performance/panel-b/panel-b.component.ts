import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PanelCComponent } from '../panel-c/panel-c.component';
import { HighlightDirective } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-panel-b',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, PanelCComponent],
  templateUrl: './panel-b.component.html',
  styleUrl: './panel-b.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelBComponent {
  mysignal = signal(1);

  constructor() {
    // setTimeout(() => setInterval(() => this.changeSignalValue(), 3000), 1000);
  }
  
  changeSignalValue() {
    this.mysignal.update((value) => value + 1);
  }

  changeDetection() {
    console.log('Panel B Change Detection');
    return true;
  }
}
