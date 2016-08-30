(function (global) {
    var map = {
        'main.dev': '',
        'main.prod': '',
        'text': 'node_modules/system-text/text',
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs',
        'moment': 'node_modules/moment/moment',
        'core': 'node_modules/core-js/client/shim.min',
        'zone': 'node_modules/zone.js/dist/zone',
        'reflect': 'node_modules/reflect-metadata/Reflect'
    };
    var packages = {
        'main.dev': { main: 'main.dev.js', defaultExtension: 'js' },
        'main.prod': { main: 'main.prod.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];
    ngPackageNames.forEach(function (pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd', defaultExtension: 'js' };
    });
    var meta = {
        '@angular/*': {
            deps: ['core', 'zone', 'reflect']
        }
    };
    System.config({
        map: map,
        packages: packages,
        meta: meta
    });
})(this);
