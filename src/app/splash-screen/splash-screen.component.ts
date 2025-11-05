import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { skip } from 'rxjs';
@Component({
    selector: 'app-splash-screen',
    imports: [],
    templateUrl: './splash-screen.component.html',
    styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent {
    router = inject(Router);

    onClick() {
      this.router.navigate(['teams'], { skipLocationChange: true });
    }

}
