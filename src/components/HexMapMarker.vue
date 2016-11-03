<script>
  import HexMapMarker from './mixins/HexMapMarker.vue';

  export default {
    name: 'HexMapMarker',

    mixins: [HexMapMarker],

    mounted() {
      // Add this marker to the parent HexMapSource.
      this.$parent.features.push(this.data);
    },
  };
</script>
