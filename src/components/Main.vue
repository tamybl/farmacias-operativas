<template>
  <main>
    <b-container fluid v-show="loading">
      <h2>Loading</h2>
    </b-container>
    <b-container fluid class="" v-show="!loading">
      <b-row>
        <b-col md="auto" class="p-0">
          <PanelHeader></PanelHeader>
        </b-col>
        <b-col class="overflow-hidden">
          <PanelMap apiKey="AIzaSyCrybSM3nR50QrLYBQCzLY-x2VPlNfAswc" :locations="locations"></PanelMap>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import PanelHeader from './PanelHeader';
import PanelMap from './PanelMap';
import { mapState } from 'vuex';

export default {
  name: 'Main',
  props: {
    title: String
  },
  components: {
    PanelHeader,
    PanelMap
  },
  data() {
    return {
      activePharmacy: ''
    }
  }, 
  computed: mapState({
    loading: 'loading',
    locations: state => state.pharmacyList
  }),
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
a:focus
{
	outline: 3px auto -webkit-focus-ring-color !important;
}



</style>
