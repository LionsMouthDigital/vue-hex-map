<template>
  <!-- No need for DOM element. -->
  <div v-if="false"></div>
</template>

<script>
  import _       from 'lodash';
  import axios   from 'axios';
  import Promise from 'es6-promise';
  import Vue     from 'vue';

  Promise.polyfill();

  export default Vue.extend({
    props: {
      // Coordinates.
      coords:  Array,
      // Address to geocode.
      address: String,

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


    data() {
      return {
        /**
         * Where this data ends up so that the marker gets rendered.
         *
         * @type {Array}
         */
        destination: this.$parent.features,

        /**
         * The data to push to the parent.
         *
         * @type {Object}
         */
        pushData: {},

        /**
         * When passed an `address`, this gets filled with geocoded coordinates.
         *
         * @type {Array}
         */
        geocoded: [],
      };
    },


    computed: {
      /**
       * Figure out the coordinates to use.
       *
       * @author Curtis Blackwell
       */
      coordinates() {
        // Use `coords` if passed, fall back to the geocoded address.
        return _.size(this.coords) ? this.coords : this.geocoded;
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


    methods: {
      /**
       * Push the appropriate data to the destination so it can render the marker.
       *
       * @author Curtis Blackwell
       */
      pushToDestination() {
        // Make sure the coordinates and appropriate data are set.
        if (_.size(this.coordinates) && _.size(this.pushData)) {
          this.destination.push(this.pushData);
        }
      },

      /**
       * Geocode an adress.
       *
       * @author Curtis Blackwell
       * @param  {string} address
       */
      geocode(address) {
        let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json';

        axios.get(url, {
          params: {
            // The access token gets passed to `HexMap`, which is either the parent or grandparent.
            access_token: this.$parent.accessToken || this.$parent.$parent.accessToken,
          }
        }).then((response) => {
          // Set `geocoded` to first result's coordinates (results are sorted by relevancy).
          this.geocoded = response.data.features[0].geometry.coordinates;

        }).catch((error) => {
          // Not really sure what to do about errors yet. ¯\_(ツ)_/¯
          console.error(error);
        });
      },
    },


    created() {
      // Geocode the address if passed.
      if (typeof this.address === 'string') {
        this.geocode(this.address);
      }
    },
  });
</script>
