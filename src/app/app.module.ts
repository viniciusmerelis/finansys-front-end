import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from "@angular/common/locales/pt";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localePt);
function noopFactory() {
  return function () { };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: "pt"
    },
    {
      provide: MAT_DATE_LOCALE, useValue: "pt-br"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
