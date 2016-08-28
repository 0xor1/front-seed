(function(global) {

    // map tells the System loader where to look for things
    var map = {
        'main': '',
        '@angular': 'lib/@angular',
        'rxjs': 'lib/rxjs',
        'moment': 'lib/moment/moment',
        'core': 'lib/core-js/client/shim.min',
        'zone': 'lib/zone.js/dist/zone',
        'reflect': 'lib/reflect-metadata/Reflect'
    };

    var packages = {
        'main':                       { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                      { defaultExtension: 'js' },
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

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = {main: 'index', defaultExtension: 'js'};
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    // No umd for router yet
    packages['@angular/router'] = {main: 'index.js', defaultExtension: 'js'};

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
