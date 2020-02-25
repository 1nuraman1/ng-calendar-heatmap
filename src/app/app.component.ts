import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';
import { CalendarData } from 'ng-calendar-heatmap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public chartData: CalendarData[];

  constructor() {
    const now: Date = moment()
      .endOf('day')
      .toDate();
    const yearAgo: Date = moment()
      .startOf('day')
      .subtract(1, 'year')
      .toDate();

    this.chartData = d3.timeDays(yearAgo, now).map(dateElement => {
      return {
        date: dateElement,
        count:
          dateElement.getDay() !== 0 && dateElement.getDay() !== 6
            ? Math.floor(Math.random() * 60)
            : Math.floor(Math.random() * 10)
      } as CalendarData;
    });
  }
}