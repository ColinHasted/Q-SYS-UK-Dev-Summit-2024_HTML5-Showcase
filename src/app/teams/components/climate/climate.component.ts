import {
  Component,
  inject,

} from '@angular/core';
import { QrwcAngularService } from '../../../../qrwc/qrwc-angular-service';
import { WindowShadeComponent } from './window-shade/window-shade.component';

@Component({
    selector: 'app-climate',
    templateUrl: './climate.component.html',
    styleUrls: ['./climate.component.scss'],
    imports: [WindowShadeComponent]
})
export class ClimateComponent  {
  private readonly qrwc = inject(QrwcAngularService);

  constructor() {

  }
}
