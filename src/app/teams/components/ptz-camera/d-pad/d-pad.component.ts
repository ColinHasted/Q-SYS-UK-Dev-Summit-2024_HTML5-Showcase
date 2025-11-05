import { Component, EventEmitter, inject, output, Output } from '@angular/core';

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

@Component({
  standalone: true,
  selector: 'app-d-pad',
  templateUrl: './d-pad.component.html',
  styleUrl: './d-pad.component.scss',
})
export class DPadComponent {
  Direction = Direction;
  directionChange = output<{ direction: Direction; state: boolean }>();
  homePress = output();

  navigate(direction: Direction, state: boolean, event: PointerEvent): void {
    (event.target as HTMLElement).classList.toggle('active', state);
    this.directionChange.emit({ direction, state });
  }

  home(state: boolean, event: PointerEvent): void {
    (event.target as HTMLElement).classList.toggle('active', state);
    this.homePress.emit();
  }
}
