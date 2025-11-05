import { Component, effect, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { QrwcAngularService } from '../../../../qrwc/qrwc-angular-service';
import { QrwcSnapshotControllerComponent } from '../../../../qrwc/components/qrwc-snapshot-controller-component';
interface Preset {
  name: string;
  active: Signal<number>;
}
@Component({
    selector: 'app-lighting',
    templateUrl: './lighting.component.html',
    styleUrls: ['./lighting.component.scss'],
    imports: []
})
export class LightingComponent {
  private readonly qrwc = inject(QrwcAngularService);

  Presets = new QrwcSnapshotControllerComponent('Lighting.Presets',4);

  // Private bindings for lighting controls
  private readonly _level1Binding;
  private readonly _level2Binding;
  private readonly _level3Binding;
  private readonly _level4Binding;
  private readonly _preset1Binding;
  private readonly _preset2Binding;
  private readonly _preset3Binding;
  private readonly _preset4Binding;

  // Array of feedback signals for the active state of lighting presets.
  // Each element corresponds to a specific preset's feedback signal, allowing monitoring of its active state.
  public readonly levels: Signal<number>[];

  public readonly presets: Preset[] = [
    { name: 'Presentation', active: this.Presets.load[1] },
    { name: 'Conference', active: this.Presets.load[2] },
    { name: 'Lights Half', active: this.Presets.load[3] },
    { name: 'Off', active:  this.Presets.load[4] },
  ]

  constructor() {
    // Initialize bindings
    this._level1Binding = this.qrwc.bindControl('Lighting', 'percent.1', 0);
    this._level2Binding = this.qrwc.bindControl('Lighting', 'percent.2', 0);
    this._level3Binding = this.qrwc.bindControl('Lighting', 'percent.3', 0);
    this._level4Binding = this.qrwc.bindControl('Lighting', 'percent.4', 0);

    this._preset1Binding = this.qrwc.bindControl('Lighting.Preset.1', 'input', false);
    this._preset2Binding = this.qrwc.bindControl('Lighting.Preset.2', 'input', false);
    this._preset3Binding = this.qrwc.bindControl('Lighting.Preset.3', 'input', false);
    this._preset4Binding = this.qrwc.bindControl('Lighting.Preset.4', 'input', false);

    this.levels = [
      this._level1Binding.value,
      this._level2Binding.value,
      this._level3Binding.value,
      this._level4Binding.value
    ];
  }

  /**
   * Activates a lighting preset based on the provided preset number.
   *
   * @remarks
   * This method activates a predefined lighting position and focus setting by sending a digital signal to the control system.
   *
   * @param preset The preset number to activate.
   * @param state Indicates whether to activate (true) or deactivate (false) the preset.
   * @param event The pointer event associated with the preset activation.
   */
  preset(preset: number, state: boolean, event: PointerEvent) {
    switch(preset) {
      case 1:
        this._preset1Binding.setValue(state);
        break;
      case 2:
        this._preset2Binding.setValue(state);
        break;
      case 3:
        this._preset3Binding.setValue(state);
        break;
      case 4:
        this._preset4Binding.setValue(state);
        break;
    }
  }

  onSliderChange(index:number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = Number(inputElement.value);

    switch(index) {
      case 0:
        this._level1Binding.setValue(value);
        break;
      case 1:
        this._level2Binding.setValue(value);
        break;
      case 2:
        this._level3Binding.setValue(value);
        break;
      case 3:
        this._level4Binding.setValue(value);
        break;
    }
  }
}
