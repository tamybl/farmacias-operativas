<template>
  <main class="h-100">
    <b-container fluid v-show="loading" class="bg-white h-100">
      <Loader></Loader>
    </b-container>
    <b-container fluid class="h-100" v-show="!loading">
      <b-row class="h-100">
        <b-col md="auto" class="p-0">
          <PanelHeader></PanelHeader>
        </b-col>
        <b-col class="overflow-hidden">
          <PanelMap apiKey="AIzaSyCrybSM3nR50QrLYBQCzLY-x2VPlNfAswc"></PanelMap>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import PanelHeader from './PanelHeader'
import PanelMap from './PanelMap'
import Loader from './Loader'
import { mapState } from 'vuex'

export default {
  name: 'Main',
  props: {
    title: String
  },
  components: {
    PanelHeader,
    PanelMap,
    Loader
  },
  data() {
    return {

    }
  }, 
  computed: {
    ...mapState({
      loading: 'loading'
    })
  },
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
