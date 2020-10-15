<template>
    <section  class="panel__left-section">
        <header id="header" class="py-3">
            <img :src="logo" alt="Farmacias Operativas">
            <h1 class="h5 px-3 font-weight-bold text-secondary text-center mt-2">Farmacias operativas</h1>
        </header>
    

        <div class="w-100 py-4 px-2 border-bottom">
            <p class="title-filter m-0 text-muted">Farmacia</p>
            <b-dropdown id="dropdown-filter-farmacia" :text="activePharmacy.length > 0 ? activePharmacy: 'Todas'" variant="outline-secondary" class="my-2 w-100 border-none">
                <b-dropdown-item @click="setFilterByName('')" :active="activePharmacy === ''">Todas</b-dropdown-item>
                <b-dropdown-item v-for="(pharmacy, index) in pharmacyNames" :key="index" :active="pharmacy == activePharmacy" @click="setFilterByName(pharmacy)">{{pharmacy}}</b-dropdown-item>
            </b-dropdown>
        </div>

        <div class="w-100 py-4 px-2 border-bottom">
            <p class="title-filter m-0 text-muted">Comuna</p>
            <b-dropdown id="dropdown-filter-comuna" :text="activeCommune.length > 0 ? activeCommune: 'Todas'" variant="outline-secondary" class="my-2 w-100 border-none">
                <b-dropdown-item @click="setFilterByCommune('')" :active="activeCommune === ''">Todas</b-dropdown-item>
                <b-dropdown-item v-for="(location, index) in locationNames" :key="index" :active="location == activeCommune" @click="setFilterByCommune(location)">{{location}}</b-dropdown-item>
            </b-dropdown>
        </div>
    </section>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import logo from './../assets/logo-fo-map.png';
    export default {
        name: 'PanelHeader',
        data() {
            return {
                publicPath: process.env.BASE_URL,
                activePharmacy: '',
                activeCommune: '',
                logo: logo
            }
        },
        computed: mapState({
            pharmacyList: state => state.pharmacyList,
            pharmacyNames(state) {
                return state.pharmacyList.reduce((acc, currentPharmacy) => {
                    if(!acc.includes(currentPharmacy.local_nombre.trim())) {
                        acc.push(currentPharmacy.local_nombre.trim());
                    }
                    return acc;  
                }, [])
                .sort((a, b) => {
                    return a.localeCompare(b);
                })
            },
            locationNames(state) {
                return state.pharmacyList.reduce((acc, currentPharmacy) => {
                if(!acc.includes(currentPharmacy.comuna_nombre.trim())) {
                    acc.push(currentPharmacy.comuna_nombre.trim());
                }
                return acc;  
            }, [])
            }
        }),
        created() {
            this.$store.dispatch('getLocals');
        },
        methods: {
            ...mapActions([
                'getLocals'
            ]),
            setFilterByName(selected) {
                this.activePharmacy = selected;
            },
            setFilterByCommune(selected) {
                this.activeCommune = selected;
            }
        }
    }
</script>

<style>
    header#header {
        background: #e6e6e6;
        text-align: center;

    }
    header#header img {
        width: 40px;
    }
    /* Panel Izquierdo */
    .panel__left-section {
        width: 300px;
        max-width: 100%;
    }
    .panel__left-section .title-filter {
        font-size: .875rem;
    }
    .panel__left-section [id*="dropdown-filter-"] .btn {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border: none !important;
        font-size: 1rem;
        color: black;
    }
    .panel__left-section [id*="dropdown-filter-"] .btn:hover, 
        .panel__left-section [id*="#dropdown-filter-"] .btn:active {
        background: transparent !important;
        color: black;
    }
    .panel__left-section [id*="dropdown-filter-"] .dropdown-menu.show {
        overflow-y: auto !important;
        overflow: hidden;
        height: 300px !important;
        width: 110%
    }
    .panel__left-section [id*="dropdown-filter-"] .dropdown-menu li {
        display: block;
    } 
    .panel__left-section [id*="dropdown-filter-"] .dropdown-menu li a {
        text-transform: uppercase;
        white-space: pre-wrap;
    }
    .panel__left-section [id*="dropdown-filter-"] .dropdown-toggle {
        padding-right: 1rem;
    }
    .panel__left-section [id*="dropdown-filter-"] .dropdown-toggle::after {
        right: 6px;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
    }
</style>