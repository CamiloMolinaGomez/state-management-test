import { Routes } from '@angular/router';
import { SignalsComponent } from './components/signals/signals.component';
import { BehaviorSubjectComponent } from './components/behavior-subject/behavior-subject.component';
import { ComparativePerformanceComponent } from './components/comparative-performance/comparative-performance.component';

export const routes: Routes = [
    { path: 'signals', component: SignalsComponent },
    { path: 'behavior-subjet', component: BehaviorSubjectComponent },
    { path: 'comparative-performance', component: ComparativePerformanceComponent },
    { path: '**', redirectTo: 'behavior-subjet'}
];
