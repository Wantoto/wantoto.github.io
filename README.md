# wantoto.com



## Build Instruction

We use [Jade](http://jade-lang.com) for pages (include Parse dynamic pages and static hosting pages)
and [LESS](http://lesscss.org) for stylesheets. 
Also we us [Grunt](http://gruntjs.com) to compile ```Jade``` template into HTML pages
and ```LESS``` into CSS stylesheets.



### Requirement

All you have to install by yourself is ```node.js``` and ```grunt-cli```.
Other required components will be installed automatically by node.js.

If you are using OS X, you can install ```node.js``` via [```homebrew```](http://brew.sh).
After you installed ```homebrew```, just install node.js by ```brew install node``` in **Terminal**.

When your ```node.js``` is ready, run ```npm installl grunt-cli -g``` to install ```grunt-cli```. 
Then run ```npm install``` at root directory of this project to install other required development tools.



### Command

#### ```grunt dev```

This command is a watcher which provides:

- Automatic LESS compilation
- Dynamically render Jade template into static pages (for development, not really generate files)
- [Live-reload](http://livereload.com)

It helps you when developing webpages. (You don't have to compile Jade and LESS before viewing pages)
Run it and open [http://127.0.0.1:8000](http://127.0.0.1:8000)


#### ```grunt build```

This commands does:

- Use [jshint](http://www.jshint.com) to check syntax of Javascript files
- Minify Javascript files by [uglify-js](https://github.com/mishoo/UglifyJS2)
- Compile LESS files into CSS stylesheets
- Compile Jade template into HTML pages (static pages, not dynamic views in ```cloud``` folder)



### Deploy

Use ```git push``` directly. Remember to run ```grunt build``` before deploy.



## Folder Structure

### Dynamic Content

- ```locales```: Translation content
- ```.jshintrc```: jsHint settings
- ```app.js```: Local dev express app
- ```Gruntfile.js```: Grunt settings
- ```localization.js```: Translation Utils
- ```package.json```: node packages
- ```script-finder.js```: Minified script locator

### Static Content

- ```static```: Images, Scripts, and Stylesheets
- ```en```: English translation
- ```common```: Files that won't be compiled into static pages/stylesheets
