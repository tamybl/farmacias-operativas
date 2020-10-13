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
          <div class="panel__right-section">
            <div class="w-100">
              <b-dropdown id="dropdown-farmacia" :text="activePharmacy.length > 0 ? activePharmacy: 'Farmacia'" variant="primary" class="m-2 w-100">
                <b-dropdown-item @click="setFilterByName('')" :active="activePharmacy === ''">Todas</b-dropdown-item>
                <b-dropdown-item v-for="(pharmacy, index) in pharmacyNames" :key="index" :active="pharmacy == activePharmacy" @click="setFilterByName(pharmacy)">{{pharmacy}}</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </b-col>
        <b-col cols="12" lg="8">Panel B</b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import axios from 'axios';


export default {
  name: 'MainSearchmap',
  props: {
    title: String
  },
  data() {
    return {
      pharmacyList: [],
      communeList: [],
      pharmacyNames: [],
      activePharmacy: ''
    }
  },
  created() {
    this.getLocales();
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


/* Panel Izquierdo */
.panel__right-section {
  width: 100%;
  max-width: 250px;
}
.panel__right-section #dropdown-farmacia .btn {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.panel__right-section #dropdown-farmacia .dropdown-menu.show {
  overflow-y: auto !important;
  overflow: hidden;
  height: 300px !important;
  width: 120%
}
.panel__right-section #dropdown-farmacia .dropdown-menu li {
  display: block;
} 
.panel__right-section #dropdown-farmacia .dropdown-menu li a {
  text-transform: uppercase;
  white-space: pre-wrap;
}
.panel__right-section #dropdown-farmacia .dropdown-toggle {
  padding-right: 1rem;
}
.panel__right-section #dropdown-farmacia .dropdown-toggle::after {
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
