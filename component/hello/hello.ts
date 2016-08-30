import { Component } from '@angular/core';
import * as tpl  from './hello.html!text';

@Component({
    selector: 'hello',
    template: tpl
})
export class Hello { }