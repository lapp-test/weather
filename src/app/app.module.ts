import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { HomeComponentComponent } from './home-component/home-component.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
// import { MatTableModule, MatSlideToggleModule } from '@angular/material';
import { CommonModule } from '@angular/common';

// import { Parse } from "parse";
// import { RegisterComponent } from './register/register.component';
// import { MatIconModule } from '@angular/material/icon';
// Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
// Parse.serverURL = environment.serverURL;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    // HomeComponent,
    // RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    // MatSnackBarModule,
    MatToolbarModule,
    // MatListModule,
    // MatSliderModule,
    // MatExpansionModule,
    MatMenuModule,
    // MatTableModule,
    // MatRadioModule,
    // MatDialogModule,
    // MatChipsModule,
    // MatInputModule,
    // MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    // MatTabsModule,
    // MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  exports: [ CommonModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
