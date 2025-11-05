import { Component, signal, OnInit, output } from '@angular/core';

@Component({
    selector: 'app-support',
    imports: [],
    templateUrl: './support.component.html',
    styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {
  close = output();
  constructor() {}

  ngOnInit(): void {
    // CrComLib.subscribeState('s', 'Csig.MTR_APP_state_fb', (state: string) => this.WindowsBuild.set(state));
  }

  exit(): void {
    this.close.emit();
  }
}



