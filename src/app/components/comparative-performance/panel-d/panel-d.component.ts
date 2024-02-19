import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HighlightDirective } from '../../../directives/highlight.directive';



@Component({
  selector: 'app-panel-d',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './panel-d.component.html',
  styleUrl: './panel-d.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelDComponent {
  subject = new BehaviorSubject<number>(1);
  constructor() {
    setInterval(() => this.changeSubjectValue(), 2500);
  }

  changeSubjectValue() {
    this.subject.next(this.subject.value + 1);
  }
  changeDetection() {
    console.log('Panel D Change Detection');
    return true;
  }
}
