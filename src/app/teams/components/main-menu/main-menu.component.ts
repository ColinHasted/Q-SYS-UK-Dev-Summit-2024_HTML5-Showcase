import { Component, computed, input, output } from '@angular/core';
import { Popup } from './../../teams.component';

@Component({
    selector: 'app-main-menu',
    imports: [],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  readonly item = input<Popup>();
  readonly setItem = output<Popup>();
  Popup = Popup;
  audio = computed(
    () =>
      this.item() === Popup.audio_graphic_eq ||
      this.item() === Popup.audio_parametric_eq ||
      this.item() === Popup.audio_responsalyzer
  );

  SelectItem(item: Popup): void {
    this.setItem.emit(item);
  }
}
