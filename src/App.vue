<template>
  <div id="app">
    <hex-map
      access-token = "pk.eyJ1IjoiY3VydGlzYmxhY2t3ZWxsIiwiYSI6ImNpdXlibnY1eTA0bW4yb24wNjh5Y2pkOWsifQ.4EEQwMrBd06fiFZshvfcug"
      style        = "mapbox://styles/curtisblackwell/ciuy9b96k00gb2js5em4uhnoa"
    >
      <hex-map-custom-marker
        address        = "400 N Ervay, Dallas, TX"
        icon           = "suitcase"
        label          = "LionsMouth Digital"
        :properties    = "{'Web Design': true, color: 'blue'}"
        :options       = "{offset: [-40, -15]}"
        :el-properties = "{
          className: 'marker',
          style: {
            backgroundImage:    'url(/assets/LMD-mark-gold.png)',
            backgroundPosition: 'bottom center',
            backgroundRepeat:   'no-repeat',
            backgroundSize:     'contain',
            width:              '30px',
            height:             '40px',
          },
        }"
      ></hex-map-custom-marker>

      <hex-map-source id="points">
        <hex-map-marker
          address = "630 West Davis St, Dallas, TX"
          label   = "The Common Desk"
        ></hex-map-marker>

        <hex-map-marker
          :coords = "[-96.8328177, 32.7493097]"
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
