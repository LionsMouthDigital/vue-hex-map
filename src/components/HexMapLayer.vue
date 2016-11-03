<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  // https://www.mapbox.com/mapbox-gl-style-spec/#layers
  export default {
    name: 'HexMapLayer',


    props: {
      // ID to apply to the layer.
      id: {
        type:     String,
        required: true,
      },

      // Type of layer.
      type: {
        type:    String,
        default: 'symbol',
      },

      // Source to pull data from.
      source: {
        type:     String,
        required: true,
      },

      // Layer's layout.
      layout: {
        type: Object,
        default() {
          return {
            'icon-image':  '{icon}-15',
            'text-field':  '{label}',
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
          };
        },
      },
    },


    computed: {
      /**
       * Layer data.
       *
       * @author Curtis Blackwell
       */
      data() {
        return {
          id:     this.id,
          type:   this.type,
          source: this.source,
          layout: this.layout,
        };
      },
    },


    mounted() {
      // Add this layer to the parent HexMap.
      this.$parent.layers.push(this.data);
    },
  };
</script>
