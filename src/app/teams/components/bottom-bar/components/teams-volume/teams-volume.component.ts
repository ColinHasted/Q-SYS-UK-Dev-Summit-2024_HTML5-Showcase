import { Component, signal, computed } from '@angular/core';
import { FadeInOutAnimation } from '../../../../../animations/animations';
import { QrwcGainComponent } from '../../../../../../qrwc/components/qrwc-gain-component';

@Component({
  standalone: true,
  selector: 'app-volume',
  templateUrl: './teams-volume.component.html',
  styleUrls: ['./teams-volume.component.scss'],
  animations: [FadeInOutAnimation],
})
export class TeamsVolumeComponent {
  /** The volume control component. */
  private readonly gainComponent = new QrwcGainComponent('ProgramVolume');
  /** The position of the volume control. This is a value between 0 and 1. */
  readonly position = this.gainComponent.position;
  /** The level of the volume control in percentage. */
  readonly level = computed(() => Math.round(this.position() * 100));
  /** The volume control mute state. */
  readonly mute = this.gainComponent.mute;
  /** Show / hide the volume control level. */
  readonly levelDisabled = signal(true);

  /**
   * Handles the volume up action.
   * @param state - The state of the button (true for active, false for inactive).
   * @param event - The pointer event.
   */
  Up(state: boolean, event: PointerEvent) {
    this.toggleButtonState(event, state);
    this.gainComponent.Increase(state);
    this.levelDisabled.set(!state);
  }
  /**
   * Handles the volume down action.
   * @param state - The state of the button (true for active, false for inactive).
   * @param event - The pointer event.
   */
  Down(state: boolean, event: PointerEvent) {
    this.toggleButtonState(event, state);
    this.gainComponent.Decrease(state);
    this.levelDisabled.set(!state);
  }
  /**
   * Handles the mute action.
   * @param state - The state of the button (true for active, false for inactive).
   * @param event - The pointer event.
   */
  Mute(state: boolean, event: PointerEvent) {
    this.toggleButtonState(event, state);
    if (state) {
      this.gainComponent.ToggleMute();
    }
  }
  /**
   * Toggles the active state of a button.
   * @param element - The HTML element of the button.
   * @param state - The state to set (true for active, false for inactive).
   */
  private toggleButtonState(event: PointerEvent, state: boolean): void {
    (event.target as HTMLElement).classList.toggle('active', state);
  }
}
