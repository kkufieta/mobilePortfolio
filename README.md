# Website Performance Optimization portfolio project

This project was an exercise to hone my website performance optimization skills. Given an online portfolio I applied the techniques I learned in the [Udacity Website Performance Optimization course](https://www.udacity.com/course/ud884) to optimize the critical rendering path. The main page renders now quickly and achieves a score of 90+ on PageSpeed Insights. It links to a [Pizzeria](https://katharinaxeniakufieta.github.io/frontend-nanodegree-mobile-portfolio/views/pizza.html) website that had jank when resizing the pizzas and scrolling through the website. I optimized those animations, and the page runs now on 60 frames per second (FPS).

## Optimizations I've performed

###Part 1: Optimize PageSpeed Insights score for index.html
* Removed the download of the entire Open Sans font. Instead, I copied and pasted what I needed from the font file into my **style.css** file.
* Added a print media query.
* All performance related JS files are loaded async.
* My grunt setup extracts critical CSS from the **style.css** file and inlines it into the HTML file. The rest of the CSS files are downloaded after the initial page load.
* Optimized all images for size of the browser window and resolution of the screen, using grunt and srcest. Additionally, compressed them using [ImageOptim](https://imageoptim.com/mac) (OS X only).
* Minified all JS, CSS and HTML files.

###Part 2: Optimize Frames per Second in pizza.html

* Edited the **main.js** file such that the resizing of the pizzas happens in less than 5 ms, and the scrolling runs with a smooth 60 FPS.
* Simplified the function `resizePizzas` so it won't trigger forced synchronous layout (FSL). The pizzas width simply gets set to a certain percentage of the original image size, depending on the slider position.
* Changed `updatePositions` so it won't trigger FSL by first getting `scrollTop` and then updating all elements. The process of changing the elements positions is furthermore optimized by using `style.transform` instead of `style.left`, which is a relative change in position instead of an absolute change. That helps to avoid having to read the elements position prior to changing it.

## Try it yourself: Getting started

The project is setup with a **src** and **dist** folder which hold the source code and production code, respectively. Grunt is used to optimize pictures and JS, CSS and HTML files from the **src** folder and save it in the **dist** folder.

###Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder/dist
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder/dist
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

1. To optimize the pictures and CSS, JS and HTML files, you need to install [grunt](http://gruntjs.com/installing-grunt), as well as all packages used in **Gruntfile.js**. After that, optimize pictures with the command
  ``` bash
  $> cd /path/to/your-project-folder/
  $> grunt images
  ```
  Or optimize the JS, CSS and HTML files with 
  ``` bash
  $> cd /path/to/your-project-folder/
  $> grunt
  ```


###Part 2: Optimize Frames per Second in pizza.html

To optimize **views/pizza.html**, you will need to modify **views/js/main.js** until your frames per second rate is 60 FPS or higher. You will find instructive comments in **main.js**. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).


### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

## Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in **dist/css/portfolio.css** in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>
