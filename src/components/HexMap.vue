<template>
  <div :id="'hex-map-' + _uid" class="hex-map"></div>
</template>

<script>
  import _     from 'lodash';
  import Props from './props/HexMap.js';

  let optionList = _.keys(_.omit(Props, 'accessToken'));

  export default {
    name: 'HexMap',

    props: Props,

    data() {
      return {
        map: {},
      };
    },

    mounted() {
      mapboxgl.accessToken = this.accessToken;

      let options = {
        container: 'hex-map-' + this._uid,
      };

      // Loop through all the proptions (options in the props, bae!) and set them.
      optionList.forEach((option) => {
        options[option] = this[option];
      });

      // Create the map!
      this.map = new mapboxgl.Map(options);
    },
  }
</script>
