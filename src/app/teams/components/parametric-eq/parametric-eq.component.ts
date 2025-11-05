import { AfterViewInit, Component, effect, inject } from '@angular/core';
import { Chart, registerables, LogarithmicScale } from 'chart.js';
import { FormsModule, NgModel } from '@angular/forms';
import {
  QrwcParametricEqualizerComponent,
  EQBand,
} from '../../../../qrwc/components/qrwc-parametric-equalizer-component';
import { QSysKnobComponent } from '../../../components/q-sys-knob/q-sys-knob.component';
import { FilterType,ParametricEQBand,ParametricEQResponseCalculator } from '../../../../qrwc/components/helpers/parametric-eq-response-calculator';


function convertEQBandToNonSignal(eqBand: EQBand): ParametricEQBand {
  return {
    Frequency: eqBand.Frequency(),
    Gain: eqBand.Gain(),
    Q:
      eqBand.Q() ??
      ParametricEQResponseCalculator.bandwidthToQ(eqBand.Bandwidth()),
    Type: eqBand.Type(),
  };
}

function remapQRWCEqBands(eqBands: EQBand[]): ParametricEQBand[] {
  return eqBands.map((eqBand) => ({
    Frequency: eqBand.Frequency(),
    Gain: eqBand.Gain(),
    Bandwidth: eqBand.Bandwidth(),
    Q: eqBand.Q(),
    Type: eqBand.Type(),
  }));
}

@Component({
    selector: 'app-parametric-eq',
    templateUrl: './parametric-eq.component.html',
    styleUrls: ['./parametric-eq.component.scss'],
    imports: [FormsModule, QSysKnobComponent]
})
export class ParametricEqComponent implements AfterViewInit {
  value = 0;
  public ParametricEqualizer: QrwcParametricEqualizerComponent;
  FilterType = FilterType;
  private readonly ParametricEQResponseCalculator =
    new ParametricEQResponseCalculator(10, 20000, 48);

  public get frequencies(): number[] {
    return this.ParametricEQResponseCalculator.frequencies;
  }

  constructor() {
    this.ParametricEqualizer = new QrwcParametricEqualizerComponent('EQ');

    effect(() => {
      // Track reactive dependencies
      remapQRWCEqBands(this.ParametricEqualizer.ActiveEQBands());
      this.updateChart();
    });
  }

  // Knob change handlers
  onFrequencyChange(bandIndex: number, newValue: number): void {
    this.ParametricEqualizer.setFrequency(bandIndex, newValue);
  }

  onGainChange(bandIndex: number, newValue: number): void {
    this.ParametricEqualizer.setGain(bandIndex, newValue);
  }

  onBandwidthChange(bandIndex: number, newValue: number): void {
    this.ParametricEqualizer.setBandwidth(bandIndex, newValue);
  }

  chart: any;

  ngAfterViewInit(): void {
    // Register the necessary scales
    Chart.register(...registerables, LogarithmicScale);

    // Create the Chart.js chart
    const ctx = document.getElementById('responseGraph') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.ParametricEQResponseCalculator.frequencies, // Frequency labels

        datasets: [
          {
            label: 'EQ Response',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
            pointRadius: 0, // No points, just the line
            yAxisID: 'y', // Attach to the right Y-axis
          },
          {
            label: 'Phase (degrees)',
            data: [],
            borderColor: 'rgba(192, 75, 75, 1)', // Different color for the second line
            borderWidth: 2,
            fill: false,
            pointRadius: 0, // No points, just the line
            yAxisID: 'y1', // Attach to the right Y-axis
          },
          {
            label: 'EQ Band Points',
            data: [,],
            borderColor: 'orange',
            pointBorderColor: (context) => {
              return this.ParametricEqualizer.EQBands[
                Number(context.dataIndex)
              ]?.Bypass()
                ? 'red'
                : 'orange'; // Red for bypassed dots
            },
            pointRadius: 3, // Size of the dots
            showLine: false, // Disable connecting lines between the dots
            yAxisID: 'y', // Attach to the right Y-axis
          },
        ],
      },
      options: {
        plugins: {
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
            min: 10, // Set fixed min for dB scale
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
            },
          },
          y: {
            title: {
              display: true,
              text: 'Gain (dB)',
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
        },
      },
    });

    // Trigger initial chart update after chart is created
    this.updateChart();
  }

  private updateChart(): void {
    if (!this.chart) return;
    
    var bands = remapQRWCEqBands(this.ParametricEqualizer.ActiveEQBands());
    var response = this.ParametricEQResponseCalculator.calculateFilterResponse(bands);
    
    this.chart.data.datasets[0].data = response.map((r) => r.Magnitude);
    this.chart.data.datasets[1].data = response.map((r) => r.Phase);
    this.chart.data.datasets[2].data = this.ParametricEqualizer.EQBands.map(
      (band) => {
        return {
          x: Number(band.Frequency()) || 0,
          y: Number(band.Gain()) || 0,
        };
      }
    );
    this.chart.update();
  }

  toggleBypass(index: number): void {
    this.ParametricEqualizer.toggleBypass(index);
  }

  onFilterTypeChange(index: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newType = Number(selectElement.value);
    this.ParametricEqualizer.setFilterType(index, newType);
  }
}
