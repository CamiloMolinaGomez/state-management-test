import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { PanelDComponent } from '../panel-d/panel-d.component';
import { HighlightDirective } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-panel-a',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective, PanelDComponent],
  templateUrl: './panel-a.component.html',
  styleUrl: './panel-a.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelAComponent {
  subject = new BehaviorSubject<number>(1);

  constructor() {
    // setInterval(() => this.changeSubjectValue(), 1200);
  }

  changeSubjectValue() {
    this.subject.next(this.subject.value + 1);
  }

  changeDetection() {
    console.log('Panel A Change Detection');
    return true;
  }
}
