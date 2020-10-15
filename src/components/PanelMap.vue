<template>
  <div>
    <div
      class="map"
      ref="map"
    ></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import { mapGetters } from 'vuex';

export default {
    name: 'PanelMap',
    props: {
      apiKey: String,
    },
    data() {
        return {
            google: null,
            markers: [],
			mapZoom: 16,
			gMap: null,
			initialLatitude: -33.4398976,
			initialLongitude:  -70.6549467,
			pinSucursal: {
				default: 'https://d3eu402qemtr97.cloudfront.net/uploads/2030f05f-60f6-44c5-94b3-40dbb72f7cb9/original/pinDefault-sucursal.svg',
				active: 'https://d3eu402qemtr97.cloudfront.net/uploads/326974fb-1097-43df-a0c2-2d5aa2900d9b/original/pinActive-sucursal.svg',
            },
            pharmacyActive: '',
			positionMarker: null
        }
    },
    async mounted() {
      const googleMapApi = await GoogleMapsApiLoader({
        apiKey: this.apiKey
      });
      this.google = googleMapApi;
      this.mapSettings();
    },
    methods: {
        mapSettings() {
			var settings = {
				zoom: self.mapZoom,
				center: {
					lat: this.initialLatitude,
					lng: this.initialLongitude
				}
			};
			this.createMap(settings);
		},
        createMap(mapSettings) {
            const mapContainer = this.$refs.map;
            this.gMap = new this.google.maps.Map(mapContainer, mapSettings);
        },
        createMarker: function(location) {
			var self = this;
			var marker = new self.google.maps.Marker({
				position: { lat: parseFloat(location.local_lat) , lng: parseFloat(location.local_lng) },
				icon: self.pinSucursal.default,
				map: self.gMap,
				size: new self.google.maps.Size(100, 100),
				title: location.local_nombre
			});
			self.markers.push(marker);
		},
		clearMarkers: function() {
			this.markers.forEach(function(marker) {
				marker.setMap(null);
			});
			this.markers = [];
        },
        centerMap: function(lat, lng) {
			this.gMap.setCenter({
				lat: lat,
				lng: lng
			});
		},
    },
    computed: {
        ...mapGetters({
            locations: 'filteredLocations'
        })
    },
    watch: {
        locations(newLocations) {
			var self = this;
			this.gMap.setZoom(self.mapZoom);
			this.clearMarkers();
			newLocations.forEach(function(location) {
				self.createMarker(location);
            });
            this.centerMap(parseFloat(newLocations[0].local_lat), parseFloat(newLocations[0].local_lng));
			//self.markerListeners(self.markers); // añadir evento de click a los pines
			//self.positionMarker = null;

		},
    }
}
</script>

<style lang="css" scoped>
    .map {
        position: static !important;
    }
</style>