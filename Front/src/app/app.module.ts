import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeModule } from './modules/home/home.module';
import { CreatePersonModule } from './modules/create-person/create-person.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuScrollDirective } from './shared/header/directives/menu-scroll.directive';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuScrollDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    StatisticsModule,
    CreatePersonModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
