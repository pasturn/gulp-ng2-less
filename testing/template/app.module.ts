import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AsIconModule } from '../dist/src/index'

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AsIconModule
        ],
    declarations: [AppComponent],
    providers: [/* TODO: Providers go here */],
    bootstrap: [AppComponent],
})
export class AppModule { }
