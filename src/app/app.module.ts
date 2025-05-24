import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StickerListComponent } from './components/sticker-list/sticker-list.component';
import { StickerCreateComponent } from './components/sticker-create/sticker-create.component';

@NgModule({
  declarations: [
    AppComponent,
    StickerListComponent,
    StickerCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // This imports RouterModule internally
    RouterModule,       // Double check RouterModule is here!
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
