
import { Component, effect, ElementRef, viewChild,  inject, } from '@angular/core';
import { QrwcGainComponent } from '../../../../qrwc/components/qrwc-gain-component';
import { QrwcAngularService } from '../../../../qrwc/qrwc-angular-service';

@Component({
    selector: 'app-displays',
    templateUrl: './displays.component.html',
    styleUrls: ['./displays.component.scss'],

})
export class DisplaysComponent {
  private readonly qrwc = inject(QrwcAngularService);
  video = viewChild<ElementRef>('videoPlayer');
  /** The volume control component. */
  readonly gainComponent = new QrwcGainComponent('ProgramVolume');

  private readonly pauseBinding = this.qrwc.bindControl("Video","toggle.1", false);
  pause = this.pauseBinding.bool;


  constructor() {

    // Bind the functions to 'this' and store them
    effect(() => {
      const video = this.video()?.nativeElement as HTMLVideoElement;
      if(!this.pause())
      video?.pause();
      else
      video?.play();
    });
  }

  // Convert the value to an angle (0-360 degrees)
  togglePlayPause(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}


