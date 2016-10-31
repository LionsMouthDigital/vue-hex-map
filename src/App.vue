<!-- https://www.mapbox.com/help/markers/ -->

<template>
  <div id="app">
    <hex-map
      access-token = "pk.eyJ1IjoiY3VydGlzYmxhY2t3ZWxsIiwiYSI6ImNpdXlibnY1eTA0bW4yb24wNjh5Y2pkOWsifQ.4EEQwMrBd06fiFZshvfcug"
      style        = "mapbox://styles/curtisblackwell/ciuy9b96k00gb2js5em4uhnoa"
    >

    </hex-map>
  </div>
</template>

<script>
import HexMap from './components/HexMap.vue'

export default {
  name: 'app',

  components: {
    HexMap,
  },
}
</script>


<style>
  .hex-map {
    bottom: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
</style>
