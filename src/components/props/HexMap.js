export default {
  accessToken: {
    type:     String,
    required: true,
  },

  controls: Boolean,

  // [Mapbox Map object options](https://www.mapbox.com/mapbox-gl-js/api/#Map).
  attributionControl: {
    type:    Boolean,
    default: true,
  },
  bearing: {
    type: Number,
    default: 0,
  },
  bearingSnap: Number,
  boxZoom: {
    type:    Boolean,
    default: true,
  },
  center: {
    type: Array,
    default: () => {
      // Dallas!
      return [-96.8024, 32.7758];
    },
  },
  classes: Array,
  doubleClickZoom: {
    type:    Boolean,
    default: true,
  },
  dragPan: {
    type:    Boolean,
    default: true,
  },
  dragRotate: {
    type:    Boolean,
    default: true,
  },
  failIfMajorPerformanceCaveat: Boolean,
  hash: Boolean,
  interactive: {
    type:    Boolean,
    default: true,
  },
  keyboard: {
    type:    Boolean,
    default: true,
  },
  maxBounds: [Object, Array],
  maxZoom: Number,
  minZoom: Number,
  pitch: {
    type: Number,
    default: 0,
  },
  preserveDrawingBuffer: Boolean,
  scrollZoom: {
    type:    Boolean,
    default: true,
  },
  style: {
    type:    [String, Object],
    default: 'mapbox://styles/mapbox/light-v9',
  },
  touchZoomRotate: {
    type:    Boolean,
    default: true,
  },
  trackResize: {
    type:    Boolean,
    default: true,
  },
  zoom: {
    type: Number,
    default: 13,
  },
};
