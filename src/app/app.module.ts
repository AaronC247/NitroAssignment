import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TreeViewComponent} from './tree-view/tree-view.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTreeModule} from "@angular/cdk/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PostDisplayComponent} from './post-display/post-display.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTreeModule} from "@angular/material/tree";

@NgModule({
  declarations: [
    AppComponent,
    TreeViewComponent,
    PostDisplayComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CdkTreeModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonToggleModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatTreeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
