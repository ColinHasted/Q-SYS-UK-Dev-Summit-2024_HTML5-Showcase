import { AfterViewInit, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { QrwcAngularService } from '../qrwc/qrwc-angular-service';

@Component({
    selector: 'app-root',
    // As we are only declaring the router outlet here, we don't need to add a full html template.
    template: `<main class="uc-engine-canvas">
    <router-outlet></router-outlet>
  </main>`,
    styleUrl: './app.component.scss',
    imports: [RouterOutlet]
})

export class AppComponent implements AfterViewInit {
  // Change this to your Core's IP address if different
  // Or use the `host` query parameter in the URL to override it
  readonly coreIpAddress = '192.168.1.220';

  readonly qrwcService = inject(QrwcAngularService);


  title = 'q-sys-dev-summit';
  private readonly qrwc = inject(QrwcAngularService);
  constructor(private router: Router) {
        // Stops users right clicking with their mouse.
        document.addEventListener(
          'contextmenu',
          function (e) {
            e.preventDefault();
          },
          false
        );
  }

   async ngOnInit(): Promise<void> {
    try {
      const entries = this.getQueryParameters();
      const pollVal = entries['poll'];
      const coreIP = String(entries['host'] ?? this.coreIpAddress);

      const pollingInterval =
        typeof pollVal === 'number'
          ? pollVal
          : parseInt(String(pollVal ?? ''), 10) || 200;

      await this.qrwcService.connect(coreIP, pollingInterval);
      console.log('QRWC connected at app startup');
    } catch (err) {
      console.error('Failed to connect QRWC on startup:', err);
      // Optionally surface a UI error or retry strategy
    }
  }

  ngAfterViewInit(): void {
        // Once built, navigate to the first page.
        this.router.navigate(['teams'], { skipLocationChange: true });
  }
/**
   * Get query parameters from the current URL.
   * - Returns a map where keys are lower-cased.
   * - Attempts to coerce numeric and boolean-looking values to the appropriate types.
   */
  getQueryParameters(): Record<string, string | number | boolean> {
    // If window isn't available (SSR), return an empty object.
    if (typeof window === 'undefined' || !window.location) {
      return {};
    }

    const url = new URL(window.location.href);
    const params = url.searchParams;
    const queries: Record<string, string | number | boolean> = {};

    const parseValue = (v: string): string | number | boolean => {
      if (/^-?\d+$/.test(v)) return parseInt(v, 10);
      if (/^-?\d+\.\d+$/.test(v)) return parseFloat(v);
      if (/^(true|false)$/i.test(v)) return v.toLowerCase() === 'true';
      return v;
    };

    for (const [key, value] of params) {
      queries[key.toLowerCase()] = parseValue(value);
    }

    return queries;
  }
}
