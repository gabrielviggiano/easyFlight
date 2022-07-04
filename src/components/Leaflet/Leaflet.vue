<template>
  <div style="height: 75vh; width: 50vw;">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[47.41322, -1.219482]"
      @move="log('move')"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />
      <l-marker v-for="(i, index) in pontos" :key="index" :lat-lng="i.pontos" draggable @moveend="log('moveend')">
        <l-tooltip>
          Parada {{index+1}}: {{i.cidade}}
        </l-tooltip>
      </l-marker>

      <l-polyline
        :lat-lngs="latLang"
        color="grey"
      ></l-polyline>
    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  name: 'Leaflet',
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },
  props: {
    pontos: {
      type: Array
    },
    latLang: {
      type: Array
    }
  },
  data() {
    return {
      zoom: 2,
      iconWidth: 25,
      iconHeight: 40,
    };
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  methods: {
    log(a) {
      console.log(a);
    },
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
  },
};
</script>