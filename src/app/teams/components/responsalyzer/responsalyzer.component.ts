import {
  AfterViewInit,
  asNativeElements,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  viewChild,
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartItem,
  registerables,
  LogarithmicScale,
} from 'chart.js';
import {
  QrwcResponsalyzerComponent,
  RtaBandwidth,
} from '../../../../qrwc/components/qrwc-responsalyzer-component';

@Component({
    selector: 'app-responsalyzer',
    templateUrl: './responsalyzer.component.html',
    styleUrls: ['./responsalyzer.component.scss'],
    imports: []
})
export class ResponsalyzerComponent implements AfterViewInit {
  private readonly responsalyzerComponent = new QrwcResponsalyzerComponent(
    'Responsalyzer',
    RtaBandwidth.Octave24
  );

  // Chart instance
  private chart: any;

  constructor(private cdr: ChangeDetectorRef) {
    Chart.register(...registerables, LogarithmicScale);

    // Effect to redraw the chart whenever magnitudeData changes
    effect(() => {
     const magnitude = this.responsalyzerComponent.magnitude();
     if (!this.chart) return;
        this.chart.data.datasets[0].data =
          this.responsalyzerComponent.magnitude();
    });
    effect(() => {
      const phase = this.responsalyzerComponent.phase();
      if (!this.chart) return;

        this.chart.data.datasets[1].data = this.responsalyzerComponent.phase();

    });
    effect(() => {
      const response = this.responsalyzerComponent.response();
      if (!this.chart) return;

        this.chart.data.datasets[2].data = response;

    });
    effect(() => {
      const coherence = this.responsalyzerComponent.coherence();
      if (!this.chart) return;
        this.chart.data.datasets[3].data =coherence
         // this.responsalyzerComponent.coherence();
        this.chart.update();

      }
    );
  }

  // Initialize the chart
  private initChart(): void {
    const ctx = document.getElementById('responseGraph') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.responsalyzerComponent.frequencies(), // X-axis is the frequency values
        datasets: [
          {
            label: 'Magnitude (dB)',
            data: this.responsalyzerComponent.magnitude(), // Y-axis is the magnitude data from the signal
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            pointRadius: 0, // No points, just the line
            yAxisID: 'y', // Attach to the right Y-axis
          },
          {
            label: 'Phase (degrees)',
            data: this.responsalyzerComponent.phase(), // Y-axis is the second line data from the second signal
            borderColor: 'rgba(192, 75, 75, 1)', // Different color for the second line
            borderWidth: 2,
            fill: false,
            pointRadius: 0, // No points, just the line
            yAxisID: 'y1', // Attach to the right Y-axis
          },
          {
            label: 'Response (dB)',
            data: this.responsalyzerComponent.response(), // Y-axis is the second line data from the second signal
            borderColor: 'rgba(192, 75, 192, 1)', // Different color for the second line
            borderWidth: 2,
            fill: 'start',
            backgroundColor: 'rgba(192, 75, 192, 0.5)',
            pointRadius: 0, // No points, just the line
            yAxisID: 'y', // Attach to the right Y-axis
          },
          {
            label: 'Coherence',
            borderWidth: 2,
            data: this.responsalyzerComponent.coherence(), // Coherence data (in percentage format)
            yAxisID: 'yCoherence', // Assign to the hidden y-axis
            borderColor: 'green',
            pointRadius: 0, // No points, just the line
            fill: false,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Responsalyzer',
            color: 'white', // Change title color here
          },
          legend: {
            display: false, // Set to false to hide the legend
          },
        },
        scales: {
          x: {
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Frequency (Hz)',
              color: 'white',
            },
            min: 20, // Set fixed min for dB scale
            max: 20000, // Set fixed max for dB scale
            ticks: {
              callback: (value) => {
                const predefinedValues = [
                  20, 30, 40, 50, 100, 200, 300, 400, 1000, 2000, 3000, 4000,
                  5000, 10000, 20000,
                ];

                if (predefinedValues.includes(+value)) {
                  return +value >= 1000 ? +value / 1000 + 'k' : value;
                }

                return undefined;
              },
              color: 'white',
            }, // Change Y1-axis label color},
          },
          y: {
            title: {
              display: true,
              text: 'Magnitude (dB)',
              color: 'white',
            },
            min: -20, // Set fixed min for dB scale
            max: 20, // Set fixed max for dB scale
            ticks: {
              color: 'white', // Change Y1-axis label color
              //  stepSize: 20,  // Step size for the second Y-axis
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Phase (degrees)',
              color: 'white',
            },
            min: -180, // Different range for the second Y-axis
            max: 180, // Set fixed max for second Y-axis

            ticks: {
              color: 'white', // Change Y1-axis label color
              //  stepSize: 20,  // Step size for the second Y-axis
            },
            grid: {
              drawOnChartArea: false, // Avoid grid lines overlapping from the right Y-axis
            },
          },
          yCoherence: {
            type: 'linear',
            display: false, // Hide this scale from being printed
            min: 0,
            max: 100, // 0-100% represented as 0-1
          },
        },
      },
    });
  }

  ngAfterViewInit(): void {
    // Register the necessary scales
    this.initChart();
  }
}
