# tpl2module

Compile templates into JS module

## Getting Started
### On the server
Install the module with: `npm install tpl2module`

```javascript
var tpl2module = require('tpl2module');
tpl2module.awesome(); // "awesome"
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/minddriven/tpl2module/master/dist/tpl2module.min.js
[max]: https://raw.github.com/minddriven/tpl2module/master/dist/tpl2module.js

In your web page:

```html
<script src="dist/tpl2module.min.js"></script>
<script>
awesome(); // "awesome"
</script>
```

In your code, you can attach tpl2module's methods to any object.

```html
<script>
this.exports = Bocoup.utils;
</script>
<script src="dist/tpl2module.min.js"></script>
<script>
Bocoup.utils.awesome(); // "awesome"
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Tom Tang  
Licensed under the MIT license.
