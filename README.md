# vue-hex-map
You may pass either a number or an object to the `zoom` property on a `<hex-map>`. When passing an
object, keys are breakpoints and values are the zoom level.

For example, if your breakpoints are 600, 900, 1200, and 1800; you might do something like:

```html
<hex-map
  access-token = "pk.eyJ1IjoiY3VydGlzYmxhY2t3ZWxsIiwiYSI6ImNpdXlibnY1eTA0bW4yb24wNjh5Y2pkOWsifQ.4EEQwMrBd06fiFZshvfcug"
  style        = "mapbox://styles/curtisblackwell/ciuy9b96k00gb2js5em4uhnoa"
  ref          = "map"
  :zoom        = "{
      0:  10,
     600: 12,
    1200: 13,
  }"
>
  ...
</hex-map>
```

Setting a zoom value for a breakpoint of `0` ensures a desirable zoom level for the smallest
of screens.

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# lint all *.js and *.vue files
npm run lint

# run unit tests
npm test
```

For more information see the [docs for vueify](https://github.com/vuejs/vueify).
