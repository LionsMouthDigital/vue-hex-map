<template>
  <div id="app">
    <hex-map
      access-token = "pk.eyJ1IjoiY3VydGlzYmxhY2t3ZWxsIiwiYSI6ImNpdXlibnY1eTA0bW4yb24wNjh5Y2pkOWsifQ.4EEQwMrBd06fiFZshvfcug"
      style        = "mapbox://styles/curtisblackwell/ciuy9b96k00gb2js5em4uhnoa"
    >
      <hex-map-source id="points">
        <hex-map-marker
          :coords = "[-96.7984907,32.7789228]"
          icon    = "suitcase"
          label   = "LionsMouth Digital"
          :properties  = "{'Web Design': true, color: 'blue'}"
        ></hex-map-marker>

        <hex-map-marker
          :lat    = "32.7496336"
          :long   = "-96.8351809"
          label   = "The Common Desk"
        ></hex-map-marker>

        <hex-map-marker
          :lat    = "32.7486336"
          :long   = "-96.8351809"
          icon    = "restaurant"
          label   = "Bolsa Mercado"
        ></hex-map-marker>
      </hex-map-source>
      <hex-map-layer id="points" source="points"></hex-map-layer>
    </hex-map>
  </div>
</template>


<script>
  import Components from './HexMap.js';

  export default {
    name: 'app',

    components: Components,
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
