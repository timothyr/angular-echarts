import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {EChartsCustom} from '../typings';
import {ECharts, init as echartsInit} from 'echarts';

export interface GraphData {
  categories: string[]
  values: number[]
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {

  // Matches id='graph' in html
  @ViewChild('graph') graph: ElementRef;

  chart: ECharts;

  /**
   * Set the graph data for this component
   */
  @Input() set graphData(data: GraphData) {
    if (!this.chart) {
      this.initChart()
    }

    // Guard against init or bad data
    if (!data) {
      return;
    }

    // setOption will update the graph with new values
    this.chart.setOption({
      xAxis: [
        {
          data: data.categories
        }
      ],
      series: [
        {
          name: 'Values',
          data: data.values
        }
      ]
    });

    this.chart.resize()
  }

  // Initialize chart size, names, axes, etc
  initChart(): void {
    this.chart = echartsInit(this.graph.nativeElement)
    const eChartOptions = {
      grid: {
        left: 50,
        top: 50,
        right: 50,
        bottom: 50
      },
      legend: [
        {
          top: '10',
          right: '15',
          data: [
            {
              name: 'Values',
              icon: 'line'
            }
          ]
        }
      ],
      xAxis: [
        {
          type: 'category' as EChartsCustom.Axis.type,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          splitLine: {
            lineStyle: {
              color: '#f4f4f4'
            }
          },
          type: 'value' as EChartsCustom.Axis.type
        }
      ],
      series: [
        {
          name: 'Demo Graph',
          type: 'bar',
          barWidth: '30%',
          itemStyle: {color: '#aa314d'},

          smooth: true,
          markLine: {
            data: [{type: 'average', name: 'avg-values'}],
            lineStyle: {
              color: '#038e9f'
            }
          },
          z: 6
        }
      ]
    };

    // Set graph data
    this.chart.setOption(eChartOptions, true)

    // Resize to fit new dimensions
    this.chart.on('finished', () => {
      this.chart.resize();
    })
  }

  // Resize chart when window resizes
  @HostListener('window:resize') onResize(): void {
    this.chart.resize();
  }
}
