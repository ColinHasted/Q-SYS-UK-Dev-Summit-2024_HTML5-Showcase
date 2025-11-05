import { Component, input, output } from '@angular/core';
import { TeamsVolumeComponent } from './components/teams-volume/teams-volume.component';

@Component({
    selector: 'app-bottom-bar',
    imports: [TeamsVolumeComponent],
    templateUrl: './bottom-bar.component.html',
    styleUrl: './bottom-bar.component.scss'
})
export class BottomBarComponent {
  helpRequest = output();
  menuRequest = output();
  menuActive = input(false);

  menu(state: boolean, event: PointerEvent) {
    (event.target as HTMLElement).classList.toggle('active', state);
    if(state)
    this.menuRequest.emit();
  }

  help(state: boolean, event: PointerEvent) {
    (event.target as HTMLElement).classList.toggle('active', state);
    if(state)
    this.helpRequest.emit();
  }
}
