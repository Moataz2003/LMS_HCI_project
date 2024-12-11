import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  standalone: false,
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css'],
})
export class ProgressTrackerComponent {
  progressList = [
    { course: 'Angular Basics', completion: 80 },
    { course: 'Advanced Angular', completion: 45 },
    { course: 'RxJS Fundamentals', completion: 100 },
  ];
}
