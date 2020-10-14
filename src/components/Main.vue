<template>
  <section class="hello">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item>{{title}}</b-nav-item>
          <b-nav-item href="#">Home</b-nav-item>



          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <b-container fluid>
      <b-row>
        <b-col>
          <PanelHeader></PanelHeader>
        </b-col>
        <b-col cols="12" lg="8">Panel B</b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import axios from 'axios';
import PanelHeader from './PanelHeader';

export default {
  name: 'Main',
  props: {
    title: String
  },
  components: {
    PanelHeader
  },
  data() {
    return {
      pharmacyList: [],
      activePharmacy: ''
    }
  },
  methods: {
    getLocales() {
      axios.get('https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7')
      .then((response) => {
        this.pharmacyList = response.data;
        this.getCommunes();
        this.getPharmacyNames();
      })
    },
    getCommunes() {
      this.communeList = this.pharmacyList.reduce((acc, currentPharmacy) => {
        if(!acc.includes(currentPharmacy.comuna_nombre)) {
            acc.push(currentPharmacy.comuna_nombre);
          }
        return acc;  
      }, [])
    },
    getPharmacyNames() {
      this.pharmacyNames = this.pharmacyList.reduce((acc, currentPharmacy) => {
        if(!acc.includes(currentPharmacy.local_nombre.trim())) {
            acc.push(currentPharmacy.local_nombre.trim());
          }
        return acc;  
      }, [])
    },
    setFilterByName(selected) {
      this.activePharmacy = selected;
    }
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
