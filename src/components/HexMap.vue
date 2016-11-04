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

      let options = {
        container: 'hex-map-' + this._uid,
      };

      // Loop through all the proptions (options in the props, bae!) and set them.
      let optionList = _.keys(_.omit(Props, nonMapOptionProps));
      optionList.forEach((option) => {
        options[option] = this[option];
      });

      // Create the map!
      this.map = new mapboxgl.Map(options);

      // Ensure Mapbox is ready, then add sources, layers, and markers.
      this.map.on('style.load', () => {
        this.addSources();
        this.addLayers();
        this.addMarkers();
      });
    },
  }
</script>
