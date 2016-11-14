<template>
  <div v-show="false">
    <slot></slot>
  </div>
</template>

<script>
  import _            from 'lodash';
  import HexMapMarker from './extendables/HexMapMarker.vue';

  export default {
    name: 'HexMapCustomMarker',

    extends: HexMapMarker,

    props: {
      // HTMLElement properties for custom markers.
      elProperties: Object,
      // Options to pass to Marker constructor.
      options: {
        type: Object,
        default() {
          return {};
        },
      },
    },


    data() {
      return {
        destination: this.$parent.markers,

        /**
         * Marker DOM element.
         *
         * @type {Object}
         */
        markerEl: {},
      };
    },


    watch: {
      data: {
        /**
         * Push marker data to destination once ready.
         *
         * @author Curtis Blackwell
         */
        handler() {
          this.pushData = new mapboxgl.Marker(this.markerEl, this.options).setLngLat(this.coordinates);
          this.pushToDestination();
        },
        deep: true,
      },
    },


    mounted() {
      // Add this marker to the parent HexMap.
      let template       = document.createElement('template');
      template.innerHTML = this.$el.innerHTML || '<div></div>';
      this.markerEl      = template.content.firstChild;

      // Add the HTMLElement properties.
      _.forEach(this.elProperties, (value, attr) => {
        if (typeof value !== 'object') {
          _.set(this.markerEl, attr, value);
        } else {
          _.merge(this.markerEl[attr], value);
        }
      });
    },
  };
</script>
