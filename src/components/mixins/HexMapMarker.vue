<template>
  <!-- No need for DOM element. -->
  <div v-if="false"></div>
</template>

<script>
  import _ from 'lodash';

  export default {
    props: {
      // Coordinates.
      // Latitude.
      lat:    Number,
      // Longitude.
      long:   Number,
      // Elevation.
      el:     Number,
      // All in one.
      coords: Array,

      // Properties.
      label: String,
      // [Default icon choices](https://www.mapbox.com/maki-icons).
      icon: {
        type:    String,
        default: 'marker',
      },
      // Custom properties. Useful for filtering or whatever else you may want to do.
      properties: {
        type: Object,
        default() {
          return {};
        },
      },
    },


    computed: {
      /**
       * Figure out the coordinates to use.
       *
       * @author Curtis Blackwell
       */
      coordinates() {
        return typeof this.coords === 'object'
          // Use the `coords` prop if passed.
          ? this.coords
          // Create an array of latitude, longitude, and elevation (if it exists).
          : _.reject([this.long, this.lat, this.el], (prop) => {
              return typeof prop === 'undefined';
            });
      },


      /**
       * Feature data.
       *
       * @author Curtis Blackwell
       */
      data() {
        this.properties.label = this.label;
        this.properties.icon  = this.icon;

        return {
          type: 'Feature',
          geometry: {
            type:        'Point',
            coordinates: this.coordinates,
          },
          properties: this.properties,
        };
      },
    },
  };
</script>
