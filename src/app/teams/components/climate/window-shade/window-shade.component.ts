import {
  Component,
  inject,
} from '@angular/core';
import { QrwcAngularService } from '../../../../../qrwc/qrwc-angular-service';

@Component({
    selector: 'app-window-shade',
    templateUrl: './window-shade.component.html',
    styleUrls: ['./window-shade.component.scss'],
    imports: []
})
export class WindowShadeComponent  {
  private readonly qrwc = inject(QrwcAngularService);

  private readonly stateBinding = this.qrwc.bindControl('Shades', 'toggle.1', false);
  state = this.stateBinding.bool;

  constructor() {

  }

  toggleBlind() {
    this.stateBinding.setValue(!this.state());
  }
}
