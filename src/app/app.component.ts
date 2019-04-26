import { Component, OnInit } from '@angular/core';
import { GraphData } from './graph/graph.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-echarts';

  categories: string[] = [];
  values: number[] = [];

  graphData: GraphData;

  ngOnInit(): void {

  // Create an Observable that will publish a value on an interval
  const secondsCounter = interval(1000);
  // Subscribe to begin publishing values
  secondsCounter.subscribe(n => {
    this.categories.push(n.toString());

    const value = (Math.random() * n) + 1;
    this.values.push(value);

    this.categories = this.categories.slice(-10);
    this.values = this.values.slice(-10);

    this.graphData = {
      categories: this.categories,
      values: this.values
    };
  });


  }
}
