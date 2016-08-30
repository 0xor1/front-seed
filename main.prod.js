define(["require", "exports", '@angular/platform-browser-dynamic', 'registry', '@angular/core'], function (require, exports, platform_browser_dynamic_1, registry_1, core_1) {
    "use strict";
    core_1.enableProdMode();
    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(registry_1.Registry);
});
