<template>
  <div v-show="false">
    <slot></slot>
  </div>
</template>

<script>
  import _            from 'lodash';
  import HexMapMarker from './mixins/HexMapMarker.vue';

  export default {
    name: 'HexMapCustomMarker',


    mixins: [HexMapMarker],


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


    mounted() {
      // Add this marker to the parent HexMap.
      let template       = document.createElement('template');
      template.innerHTML = this.$el.innerHTML || '<div></div>';
      let marker         = template.content.firstChild;

      // Add the HTMLElement properties.
      _.forEach(this.elProperties, (value, attr) => {
        if (typeof value !== 'object') {
          _.set(marker, attr, value);
        } else {
          _.merge(marker[attr], value);
        }
      });

      // Push it real good.
      this.$parent.markers.push(new mapboxgl.Marker(marker, this.options).setLngLat(this.coords));
    },
  };
</script>
