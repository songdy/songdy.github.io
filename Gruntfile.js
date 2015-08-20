'use strict';

/*global module:false*/
module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp',
    env: process.env.NODE_ENV || 'development',
    port: process.env.NODE_ENV === 'production' ? 8000 : 8001,
    livereload: 20189
  };

  // Project configuration.
  grunt.initConfig({

    cfg: appConfig,

    clean: {
      tmp: appConfig.tmp,
      dist: appConfig.dist
    },

    less: {
      compile: {
        options: {
          compress: false,
          cleancss: true
        },
        files: [{
          expand: true,
          cwd: '<%= cfg.app %>/styles/less',
          src: ['**/*.less'],
          dest: '<%= cfg.tmp %>/styles/css',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      app: {
        options: {
          browsers: [
            '> 5%',
            'last 4 version',
            // 'ff 4'
          ],
          map: false,
        },
        files: [{
          expand: true,
          cwd: '<%= cfg.tmp %>/styles/css',
          src: '{,*/}*.css',
          dest: '<%= cfg.app %>/styles/css'
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      app: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= cfg.app %>/scripts/{,*/}*.js']
      }
    },

    injector: {
      options: {
        template: '<%= cfg.app %>/index.html',
        addRootSlash: false,
        ignorePath: '<%= cfg.app %>/'
      },
      js: {
        files: {
          '<%= cfg.app %>/index.html': ['<%= cfg.app %>/scripts/**/*.js']
        }
      },
      css: {
        files: {
          '<%= cfg.app %>/index.html': ['<%= cfg.app %>/styles/**/*.css']
        }
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= cfg.app %>/index.html'],
        exclude: ['bower_components/angular/angular.js'],
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfg.tmp %>/concat/scripts',
          src: '**/*.js',
          dest: '<%= cfg.tmp %>/concat/scripts'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfg.app %>',
          dest: '<%= cfg.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            '**/*.html',
            '**/*.{png,jpg,jpeg,gif,webp,json}',
          ]
        }],
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      app: [
        'less'
      ],
      dist: [
        'less',
        'imagemin',
        'svgmin'
      ]
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfg.dist %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= cfg.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= cfg.dist %>/images',
          src: '{,*/}*.svg',
          dest: '<%= cfg.dist %>/images'
        }]
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= cfg.dist %>/scripts/{,*/}*.js',
          '<%= cfg.dist %>/styles/{,*/}*.css',
          '<%= cfg.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= cfg.app %>/index.html',
      options: {
        root: '<%= cfg.app %>',
        dest: '<%= cfg.dist %>',
        staging: '<%= cfg.tmp %>',
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= cfg.dist %>/index.html', '<%= cfg.dist %>/views/*.html'],
      js: ['<%= cfg.dist %>/scripts/js/*.js'],
      css: ['<%= cfg.dist %>/styles/css/*.css']
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= cfg.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= cfg.dist %>'
        }]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: appConfig.port,
        hostname: 'localhost',
        livereload: appConfig.livereload,
      },
      app: {
        options: {
          open: appConfig.env === 'development',
          base: appConfig.app
        }
      },
      dist: {
        options: {
          open: appConfig.env === 'development',
          base: appConfig.dist
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= cfg.app %>/{,/views/}*.html',
          '<%= cfg.app %>/{,/templates/}*.html',
          '<%= cfg.app %>/styles/{,*/}*.css',
          '<%= cfg.app %>/scripts/{,*/}*.js',
          '<%= cfg.app %>/images/{,*/}*.{png,jpg}'
        ]
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      less: {
        files: ['<%= cfg.app %>/styles/less/**/*.less'],
        tasks: ['less', 'autoprefixer']
      },
      js: {
        files: ['<%= cfg.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
    },
  });


  grunt.registerTask('build', function(target) {

    var buildTasks = [
      'jshint',
      'clean',
      'copy',
      'concurrent:dist',
      'autoprefixer',
      'wiredep',
      'injector',
      'useminPrepare',
      'concat:generated',
      'cssmin:generated',
      'ngAnnotate',
      'uglify:generated',
      'filerev',
      'usemin',
      'htmlmin'
    ]

    if (target === 'app') {
      buildTasks[3] = 'concurrent:app';
      return grunt.task.run(buildTasks);
    }
    grunt.task.run(buildTasks);
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {

    console.log(appConfig.env);

    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist', 'watch']);
    }

    grunt.task.run([
      'build:app',
      'connect:app',
      'watch'
    ]);
  });


  // Default task.
  grunt.registerTask('default', ['build']);

};
