# wantoto.com


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
