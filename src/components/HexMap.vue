<template>
  <div :id="'hex-map-' + _uid" class="hex-map"><slot></slot></div>
</template>

<script>
  // https://www.mapbox.com/mapbox-gl-js/api/#Map
  import _     from 'lodash';
  import Props from './props/HexMap.js';

  // Props that are not options for Mapbox's Map object.
  // These get filtered out of `Props` when setting the Map options in the `mounted` hook.
  const nonMapOptionProps = ['accessToken'];
  const computedProps     = ['zoom'];


  export default {
    name: 'HexMap',


    props: Props,


    data() {
      return {
        /**
         * Mapbox Map object.
         *
         * @type {Object}
         */
        map: {},

        /**
         * Map's source data.
         *
         * @type {Array}
         */
        sources: [],

        /**
         * Map's layers.
         *
         * @type {Array}
         */
        layers: [],

        /**
         * Marker objects.
         *
         * @type {Array}
         */
        markers: [],
      };
    },


    computed: {
      // Computed properties prefixed with `option` are used in the options for `this.map` in the
      // mounted hook.
      /**
       * Calculate the correct zoom to set when the page loads.
       *
       * @author Curtis Blackwell
       * @return {Number}
       */
      optionZoom() {
        // Just return number values. Decisive, I like that!
        if (typeof this.zoom === 'number') {
          return this.zoom;
        }

        // Sort the zoom object in descending order for looping over.
        let zooms = _(this.zoom).toPairs().reverse().value();
        let zoom  = null;
        _.forEach(zooms, (zoomObj) => {
          let breakpoint = zoomObj[0];
          let bpZoom     = zoomObj[1]

          // If this is the breakpoint we're looking for, get at dat zoom.
          if (window.outerWidth >= breakpoint) {
            zoom = bpZoom;
            // Returning `false` in a Lodash loop functions as a `break`.
            return false;
          }
        });

        return zoom;
      },
    },


    methods: {
      /**
       * Loop through all sources and add them to the map.
       *
       * @author Curtis Blackwell
       */
      addSources: function() {
        _.forEach(this.sources, (source) => {
          this.map.addSource(source.id, {
            type: source.type,
            data: source.data
          });
        });
      },


      /**
       * Loop through all layers and add them to the map.
       *
       * @author Curtis Blackwell
       */
      addLayers() {
        _.forEach(this.layers, (layer) => {
          this.map.addLayer({
            id:     layer.id,
            type:   layer.type,
            source: layer.source,
            layout: layer.layout,
          });
        });
      },


      /**
       * Loop through all markers and add them to the map.
       *
       * @author Curtis Blackwell
       */
      addMarkers() {
        _.forEach(this.markers, (marker) => {
          marker.addTo(this.map);
        });
      },


      /**
       * Show navigation controls.
       *
       * @author Curtis Blackwell
       */
      addNavigationControl() {
        if (this.controls) {
          this.map.addControl(new mapboxgl.NavigationControl());
        }
      },
    },


    watch: {
      /**
       * Add markers to map if `markers` data changes.
       *
       * @author Curtis Blackwell
       */
      markers() {
        _.forEach(this.markers, (marker) => {
          marker.addTo(this.map);
        });
      },
    },


    mounted() {
      mapboxgl.accessToken = this.accessToken;

      // // Properly set `zoom` prop if it's an object.
      // if (typeof this.zoom === 'object') {
      //   console.dir(this.zoom);
      //   this.zoom = 16;
      // }

      let options = {
        container: 'hex-map-' + this._uid,
      };

      // Loop through all the proptions (options in the props, bae!) and set them.
      let optionList = _.keys(_.omit(Props, _.merge(nonMapOptionProps, computedProps)));
      optionList.forEach((option) => {
        options[option] = this[option];
      });

      // Loop through the computed options and set them.
      computedProps.forEach((option) => {
        // Computed options are named `option` plus the name of the option (ex. optionZoom).
        let optionName  = 'option' + option.charAt(0).toUpperCase() + option.slice(1)
        options[option] = this[optionName];
      });

      // Create the map!
      this.map = new mapboxgl.Map(options);

      // Ensure Mapbox is ready, then add sources, layers, and markers.
      this.map.on('style.load', () => {
        this.addSources();
        this.addLayers();
        this.addMarkers();
        this.addNavigationControl();
      });
    },
  }
</script>
