import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { LocalizationService } from './internationalization/localization.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-boilerplate';
  loading: boolean = false;

  language: string = 'es-ES';
  // get name(): string {
  //   return this.localizationService.translate('banner.world');
  // }

  constructor(
    private _loading: LoadingService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit() {
    this.listenToLoading();
  }

  // get name(): string {
  //   return this.localizationService.translate('banner.world');
  // }

  onSelect(lang: string): void {
    localStorage.setItem('language', lang);
    this.localizationService.initService();
    console.log(lang);
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

}
