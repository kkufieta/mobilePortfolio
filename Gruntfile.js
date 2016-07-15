/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            /*
            Change these:
            width: ,
            suffix: ,
            quality:
            */
            name: '300-1x',
            width: '300px',
            quality: 30
          }, {
            name: '300-2x',
            width: '600px',
            quality: 40
          }, {
            name: '100-1x',
            width: '100px',
            quality: 30
          }, {
            name: '100-2x',
            width: '200px',
            quality: 40
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/img_src/',
          dest: 'src/img_temp/'
        }, {
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/views/img_src/',
          dest: 'src/views/img_temp/'
        }]
      }
    },

    /* Compress images */
    imagemin: {
      dist: {
      options: {
        optimizationLevel: 5
      },
      files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/img_temp/',
          dest: 'dist/img/'
      }, {
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/views/img_temp/',
          dest: 'dist/views/img/'
      }]
    }
   },

    /* Extract critical CSS and inline it into the HTML file */
    critical: {
      test: {
        options: {
          base: './src/',
          extract: true,
          inline: true,
          minify: true,
          dimensions: [{
            width: 320,
            height: 500
          }, {
            width: 900,
            height: 1300
          }]
        },
        files: [
          {src: 'src/index.html', dest: 'src/critical_html/index-critical.html'},
          {src: 'src/project-bugs.html', dest: 'src/critical_html/project-bugs-critical.html'},
          {src: 'src/project-cari.html', dest: 'src/critical_html/project-cari-critical.html'},
          {src: 'src/project-portfolio.html', dest: 'src/critical_html/project-portfolio-critical.html'},
          {src: 'src/project-webperf.html', dest: 'src/critical_html/project-webperf-critical.html'},
        ]
      }
    },

    /* Minify JavaScript */
    uglify: {
      yourTask: {
        files: {
          'dist/js/perfmatters.js': 'src/js/perfmatters.js',
          'dist/views/js/main.js': 'src/views/js/main.js',
        }
      }
    },

    /* Minify CSS */
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'src/css',
          dest: 'dist/css/',
          // ext: '.min.css'
        }, {
          expand: true,
          src: ['*.css', '!*.min.css'],
          cwd: 'src/views/css',
          dest: 'dist/views/css/',
          // ext: '.min.css'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['dist/img', 'src/img_temp'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['dist/img', 'src/img_temp']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'src/img_src/fixed/*.{gif,jpg,png}',
          dest: 'dist/img/'
        }]
      },
    },

    /* Minify HTML files */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true
        },
        files: {
          'dist/index.html': 'src/critical_html/index-critical.html',
          'dist/project-bugs.html': 'src/critical_html/project-bugs-critical.html',
          'dist/project-cari.html': 'src/critical_html/project-cari-critical.html',
          'dist/project-portfolio.html': 'src/critical_html/project-portfolio-critical.html',
          'dist/project-webperf.html': 'src/critical_html/project-webperf-critical.html',
          'dist/views/pizza.html': 'src/views/pizza.html',
        }
      }
    }
  });

  grunt.registerTask('default', ['critical', 'uglify', 'cssmin', 'htmlmin:dist']);
  grunt.registerTask('images', ['clean', 'mkdir', 'copy', 'responsive_images', 'imagemin']);
};
