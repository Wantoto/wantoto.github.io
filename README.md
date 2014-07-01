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













## Build

Install ```node.js``` and ```npm``` first
 
```
brew install node
```
Then install required modules by ```npm```

```
npm install
```


## Development

We use [jade](http://jade-lang.com) to compose pages

use "_t" to load translated string, like following

```
p= _t('translation.key.path', 'DefaultText')
```

And add strings in ```locales/{en,tw}.json```


### Preview 

```
grunt dev-server
```

And open ```http://127.0.0.1:8000``` in your browser


### Compile LESS when modified
 
```
grunt watch:less
```


### Build for production

```
grunt build
```
