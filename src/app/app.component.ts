import { Component, OnInit } from '@angular/core';
import { CalendarData, CalendarWeekStart, CalendarOptions, RandomDataService } from 'ng-calendar-heatmap';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public calendarData: CalendarData[];
  public currentCalendarData: CalendarData[];
  formattedData: any;


  public calendarOptionsCustom: CalendarOptions;

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private datePipe: DatePipe,
              protected randomDataService: RandomDataService,
              private dataService: DataService,) {

    this.currentCalendarData = randomDataService.generate(10, 20);
    this.currentCalendarData = this.currentCalendarData.map((el: any) => {
      const date = this.datePipe.transform(new Date(el.date), 'yyyy-MM-dd');
      return {
        ...el,
        date: date
      }
    })
  }

  ngOnInit(): void {
    this.fetchCalendarData();

  }

  fetchCalendarData(): void {
    this.dataService.getCalendarData().subscribe(
      (data) => {
        this.calendarData = data;
        this.formatData()
      },
      (error) => {
        console.error('Error fetching calendar data:', error);
      }
    );
  }

  formatData(): void {
    this.formattedData = Object.entries(this.calendarData).map(([date, count]) => {
      return { date, count };
    });
    this.currentCalendarData = this.currentCalendarData.map((item: any) => {
      const replaceDate = this.formattedData.find((el: any) => item.date === el.date);
      return {
        ...item,
        count: replaceDate ? replaceDate.count : 0
      }
    })
  }

}
