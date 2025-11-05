import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  PtzDirection,
  QrwcPtzCameraComponent,
} from '../../../../qrwc/components/qrwc-camera-component';
import { QrwcSnapshotControllerComponent } from '../../../../qrwc/components/qrwc-snapshot-controller-component';
import { QrwcPressAndHoldComponent } from '../../../../qrwc/components/qrwc-press-and-hold-component';
import { Direction,DPadComponent } from '../ptz-camera/d-pad/d-pad.component';

interface Preset {
  name: string;
  active: Signal<number>;
}

@Component({
    selector: 'app-ptz-camera-with-preview',
    templateUrl: './ptz-camera-with-preview.component.html',
    styleUrls: ['./ptz-camera-with-preview.component.scss'],
    imports: [DPadComponent]
})
export class PtzCameraWithPreviewComponent {
  previewEnable =input(false);

  PtzDirection = PtzDirection;
  Camera = new QrwcPtzCameraComponent('Camera');
  Presets = new QrwcSnapshotControllerComponent('Camera.Presets', 4);
  PressAndHold: QrwcPressAndHoldComponent[] = [
    new QrwcPressAndHoldComponent('Camera.Preset.1'),
    new QrwcPressAndHoldComponent('Camera.Preset.2'),
    new QrwcPressAndHoldComponent('Camera.Preset.3'),
    new QrwcPressAndHoldComponent('Camera.Preset.4'),
  ];

  readonly directionToPtzDirectionMap: { [key in Direction]: PtzDirection } = {
    [Direction.Up]: PtzDirection.Up,
    [Direction.Down]: PtzDirection.Down,
    [Direction.Left]: PtzDirection.Left,
    [Direction.Right]: PtzDirection.Right
  };


  preview = computed(() => {
    if (this.Camera.privacyEnabled())
      return 'assets/images/camera/camera-privacy-small.webp';
    else if (this.Camera.preview()?.length > 0)
      return 'data:image/jpeg;base64,' + this.Camera.preview();
    else return 'assets/images/camera/camera-offline-small.webp';
  });

  AutoFrameEnabled = this.Camera.autoFrameEnabled;
  PrivacyEnabled = this.Camera.privacyEnabled;

  // Array of feedback signals for the active state of camera presets.
  // Each element corresponds to a specific preset's feedback signal, allowing monitoring of its active state.
  public readonly presets: Preset[] = [
    { name: 'Head of Table', active: this.Presets.load[1] },
    { name: 'Whole Table', active: this.Presets.load[2] },
    { name: 'Presentation', active: this.Presets.load[3] },
    { name: 'Discussion', active: this.Presets.load[4] },
  ];

  home(event: void) {
    this.Camera.home();
  }

  move(direction: PtzDirection, state: boolean, event: PointerEvent): void {
    this.toggleActiveState(event, state);
    this.Camera.move(direction, state);
  }
  /**
   * Handles the zoom-in action for the camera.
   *
   * @remarks
   * This method controls the camera's zoom-in functionality by sending a digital signal to the control system.
   *
   * @param state The signal name or join number of the digital signal to set.
   * @param event The value to set the digital signal.
   */
  zoomIn(state: boolean, event: PointerEvent) {
    this.toggleActiveState(event, state);
    this.Camera.zoomIn(state);
  }

  /**
   * Handles the zoom-out action for the camera.
   *
   * @remarks
   * This method controls the camera's zoom-out functionality by sending a digital signal to the control system.
   *
   * @param state Indicates whether to start (true) or stop (false) zooming out.
   * @param event The pointer event associated with the zoom-out action.
   */
  zoomOut(state: boolean, event: PointerEvent) {
    this.toggleActiveState(event, state);
    this.Camera.zoomOut(state);
  }

  /**
   * Activates a camera preset based on the provided preset number.
   *
   * @remarks
   * This method activates a predefined camera position and focus setting by sending a digital signal to the control system.
   *
   * @param preset The preset number to activate.
   * @param state Indicates whether to activate (true) or deactivate (false) the preset.
   * @param event The pointer event associated with the preset activation.
   */
  preset(preset: number, state: boolean, event: PointerEvent) {
    this.PressAndHold[preset].Input(state);
  }

  /**
   * Enables the auto-framing feature of the camera.
   *
   * @remarks
   * This method enables the camera's auto-framing functionality, allowing it to automatically adjust its position and zoom to frame the subject.
   *
   * @param state Indicates whether to enable (true) or disable (false) auto-framing.
   * @param event The pointer event associated with the auto-framing action.
   */
  toggleAutoFraming(state: boolean, event: PointerEvent) {
    this.toggleActiveState(event, state);
    if (state) this.Camera.toggleAutoFraming();
  }

  togglePrivacy(state: boolean, event: PointerEvent) {
    this.toggleActiveState(event, state);
    if (state) this.Camera.togglePrivacy();
  }

  /**
   * Toggles the 'active' class on the event's target element based on the given state.
   *
   * @remarks
   * This utility method is used to visually indicate an active state on the UI by toggling a CSS class.
   *
   * @param event The pointer event that triggered the action.
   * @param state The desired state to reflect on the target element (true adds the class, false removes it).
   */
  toggleActiveState(event: PointerEvent, state: boolean): void {
    (event.target as HTMLElement).classList.toggle('active', state);
  }

  onDpadDirectionChange(event: { direction: Direction, state: boolean }): void {
   this.Camera.move(this.directionToPtzDirectionMap[event.direction], event.state);
  }
}
