import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MustMatchDirective } from './directives/must-match.directive';
import { LoadingComponent } from './loading/loading.component';
import { LoadingSpinnerComponent } from './loading/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [MustMatchDirective, LoadingComponent, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [TranslateModule, MustMatchDirective, LoadingComponent],
})
export class SharedModule {}
