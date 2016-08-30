module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        systemjs: {
            options: {
                sfx: true,
                sourceMaps: false,
                configFile: "system.config.js",
                minify: true,
                build: {
                    mangle: true
                }
            },
            test: {
                files: [{
                    "src":  "main.prod.js",
                    "dest": "main.prod.min.js"
                }]
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'build/component',
                    src: '**/*.html',
                    dest: 'build/component'
                }]
            }
        },

        'json-minify': {
            build: {
                files: 'build/**/*.json'
            }
        },

        exec: {
            buildServer: {
                cmd: 'go build -o server.exe -v server.go'
            },
            startDevServer: {
                cmd: './server.exe'
            },
            startBuildServer: {
                cmd: 'cd build && ./server.exe'
            },
            winStartDevServer: {
                cmd: 'server.exe'
            },
            winStartBuildServer: {
                cmd: 'cd build && server.exe'
            },
            compileTypescript: {
                cmd: 'tsc'
            },
            watchTypescript: {
                cmd: 'tsc -w'
            },
            compileDevSass: {
                cmd: 'node node_modules/node-sass/bin/node-sass --output-style compressed -r -o . .'
            },
            compileBuildSass: {
                cmd: 'node node_modules/node-sass/bin/node-sass --output-style compressed -r -o . .'
            },
            watchDevSass: {
                cmd: 'node node_modules/node-sass/bin/node-sass --output-style compressed -w -r -o . .'
            },
            updateSeleniumServer: {
                cmd: 'node node_modules/protractor/bin/webdriver-manager update'
            },
            startSeleniumServer: {
                cmd: 'node node_modules/protractor/bin/webdriver-manager start'
            },
            testClient: {
                cmd: 'cd test/unit && node ../../node_modules/karma/bin/karma start'
            },
            testClientCI: {
                cmd: 'cd test/unit && node ../../node_modules/karma/bin/karma start --browsers PhantomJS'
            },
            testE2e: {
                cmd: 'cd test/e2e && node ../../node_modules/protractor/bin/protractor protractor.conf.js'
            }
        },

        copy: {
            serverExe: {
                src: 'server.exe',
                dest: 'build/server.exe',
                options : {
                    mode: true
                }
            },
            serverConfigJson: {
                src: 'src/server.config.json',
                dest: 'build/server.config.json',
                options : {
                    mode: true
                }
            },
            fullClient: {
                cwd: 'src/client',
                src: '**',
                dest: 'build/client/',
                expand: true,
                options : {
                    mode: true
                }
            }
        },

        processhtml: {
            clientIndex: {
                files: {
                    'build/client/index.html': ['build/client/index.html']
                }
            }
        },

        uglify: {
            mainJsBuild: {
                files: {
                    'main.dev.build.min.js': ['main.dev.build.js']
                }
            }
        },

        clean: {
            allClientBuildExcept_index_robot_favicon_main_resources: ['build/client/**/*', '!build/client/index.html', '!build/client/main.js', '!build/client/robots.txt', '!build/client/favicon.ico', '!build/client/resource/**'],
            buildCss: ['build/client/**/*.css', '!build/client/resource/**/*.css'],
            server: ['build/server*', 'server.exe'],
            clientBuild: ['build/client'],
            clientTest: ['test/unit/coverage/*','test/unit/results/*'],
            sass: ['src/client/**/*.css'],
            e2e: ['test/e2e/results/*']
        },

        compass: {
            dev: {
                options: {
                    outputStyle: 'compressed',
                    cssPath: 'src/client',
                    sassPath: 'src/client',
                    watch: true,
                    trace: true
                }
            },
            build: {
                options: {
                    outputStyle: 'compressed',
                    cssPath: 'build/client',
                    sassPath: 'build/client',
                    watch: false,
                    trace: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-systemjs-builder');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-json-minify');


    grunt.registerTask('buildServer', ['exec:buildServer', 'copy:serverExe', 'copy:serverConfigJson']);
    grunt.registerTask('cleanServer', ['clean:server']);

    grunt.registerTask('buildClient', ['copy:fullClient', 'clean:buildCss', 'exec:compileBuildSass', 'htmlmin:build', 'json-minify:build', 'requirejs:compileMain', 'uglify:mainJsBuild', 'processhtml:clientIndex', 'clean:allClientBuildExcept_index_robot_favicon_main_resources']);
    grunt.registerTask('testClient', ['exec:testClient']);
    grunt.registerTask('testClientCI', ['exec:testClientCI']);
    grunt.registerTask('cleanClientBuild', ['clean:clientBuild']);
    grunt.registerTask('cleanClientTest', ['clean:clientTest']);

    grunt.registerTask('buildAll', ['buildServer', 'buildClient']);
    //grunt.registerTask('buildAllWithCompass', ['buildServer', 'buildClientWithCompass']);
    grunt.registerTask('cleanAllBuild', ['cleanServer', 'cleanClientBuild']);

    grunt.registerTask('watchTypescript', ['exec:watchTypescript']);

    grunt.registerTask('watchSass', ['exec:compileDevSass', 'exec:watchDevSass']);
    //grunt.registerTask('watchSassWithCompass', ['compass:dev']);
    grunt.registerTask('cleanSass', ['clean:sass']);

    grunt.registerTask('startDevServer', ['exec:startDevServer']);
    grunt.registerTask('winStartDevServer', ['exec:winStartDevServer']);
    grunt.registerTask('startBuildServer', ['exec:startBuildServer']);
    grunt.registerTask('winStartBuildServer', ['exec:winStartBuildServer']);

    grunt.registerTask('updateSeleniumServer', ['exec:updateSeleniumServer']);
    grunt.registerTask('startSeleniumServer', ['exec:startSeleniumServer']);

    grunt.registerTask('testE2e', ['exec:testE2e']);
    grunt.registerTask('cleanE2e', ['clean:e2e']);

    grunt.registerTask('nuke', ['cleanAllBuild', 'cleanClientTest', 'cleanSass', 'cleanE2e']);

};
