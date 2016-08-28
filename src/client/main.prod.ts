import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Registry } from 'registry'
import {enableProdMode} from '@angular/core';

enableProdMode();
platformBrowserDynamic().bootstrapModule(Registry);
