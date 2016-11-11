<template>
  <div id="app">
    <p
      id         = "trigger"
      @mouseover = "changeIcon('lmd', '/assets/LMD-mark-gold.png')"
      @mouseout  = "changeIcon('lmd', '/assets/lionsmouth-digital-logo.png')"
      @click     = "centerOnMarker('lmd')"
    >
      LionsMouth Digital
    </p>

    <hex-map
      access-token = "pk.eyJ1IjoiY3VydGlzYmxhY2t3ZWxsIiwiYSI6ImNpdXlibnY1eTA0bW4yb24wNjh5Y2pkOWsifQ.4EEQwMrBd06fiFZshvfcug"
      style        = "mapbox://styles/curtisblackwell/ciuy9b96k00gb2js5em4uhnoa"
      ref          = "map"
    >
      <hex-map-custom-marker
        ref            = "lmd"
        address        = "400 N Ervay, Dallas, TX"
        icon           = "suitcase"
        label          = "LionsMouth Digital"
        :properties    = "{'Web Design': true, color: 'blue'}"
        :options       = "{offset: [-20, -15]}"
        :el-properties = "{
          className: 'marker',
          style: {
            backgroundImage:    'url(/assets/lionsmouth-digital-logo.png)',
            backgroundPosition: 'bottom center',
            backgroundRepeat:   'no-repeat',
            backgroundSize:     'contain',
            width:              '30px',
            height:             '40px',
          },
          id:                   'lmd',
        }"
      ></hex-map-custom-marker>

      <hex-map-source id="points">
        <hex-map-marker
          address = "634 West Davis St, Dallas, TX"
          icon    = "restaurant"
          label   = "Bolsa Mercado"
        ></hex-map-marker>

        <hex-map-marker
          :coords = "[-96.833017, 32.749699]"
          label   = "The Common Desk"
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

    methods: {
      centerOnMarker(ref) {
        let marker = this.$refs[ref];
        marker.$parent.map.easeTo({center: marker.coordinates});
      },

      changeIcon(id, icon, $event) {
        document.querySelector('#' + id).style.backgroundImage = 'url(' + icon + ')';
      },
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

  #trigger {
    position: absolute;
    top: 0;
    z-index: 1;
  }
</style>
