<script>
  import HexMapMarker from './extendables/HexMapMarker.vue';

  export default HexMapMarker.extend({
    name: 'HexMapMarker',

    watch: {
      data: {
        /**
         * Push marker data to destination once ready.
         *
         * @author Curtis Blackwell
         */
        handler() {
          this.pushData = this.data;
          this.pushToDestination();
        },
        deep: true,
      },
    },
  });
</script>
