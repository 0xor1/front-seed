import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Hello }  from 'component/hello';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ Hello ],
    bootstrap: [ Hello ]
})
export class Registry { }