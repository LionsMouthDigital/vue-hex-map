<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  // https://www.mapbox.com/mapbox-gl-style-spec/#sources
  export default {
    name: 'HexMapSource',


    props: {
      // ID to apply to the source.
      id: {
        type:     String,
        required: true,
      },

      // Type of source.
      type: {
        type:    String,
        default: 'geojson',
      },
    },


    data() {
      return {
        /**
         * Source's features.
         *
         * @type {Array}
         */
        features: [],
      };
    },


    computed: {
      /**
       * Source data.
       *
       * @author Curtis Blackwell
       */
      data() {
        return {
          id:      this.id,
          type:    this.type,
          data: {
            type:     'FeatureCollection',
            features: this.features,
          },
        };
      }
    },


    watch: {
      data: {
        /**
         * Update the points on the map when GeoJSON changes.
         *
         * @author Curtis Blackwell
         */
        handler(newData) {
          if (typeof this.$parent.map.getSource(this.id) !== 'undefined') {
            this.$parent.map.getSource(this.id).setData(newData.data);
          }
        },
        deep: true,
      },
    },


    mounted() {
      // Add this source to the parent HexMap.
      this.$parent.sources.push(this.data);
    },
  };
</script>
