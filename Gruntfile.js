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
        src: 'src/index.html',
        dest: 'dist/index-critical.html'
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
          'dist/index.html': 'dist/index-critical.html'
        }
      }
    }
  });

  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'uglify', 'cssmin', 'imagemin', 'htmlmin:dist']);

};
