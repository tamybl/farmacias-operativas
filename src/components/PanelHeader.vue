<template>
    <div class="panel__left-section">
        <div class="w-100">
            <b-dropdown id="dropdown-farmacia" :text="activePharmacy.length > 0 ? activePharmacy: 'Farmacia'" variant="primary" class="m-2 w-100">
                <b-dropdown-item @click="setFilterByName('')" :active="activePharmacy === ''">Todas</b-dropdown-item>
                <b-dropdown-item v-for="(pharmacy, index) in pharmacyNames" :key="index" :active="pharmacy == activePharmacy" @click="setFilterByName(pharmacy)">{{pharmacy}}</b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'PanelHeader',
        data() {
            return {
                activePharmacy: ''
            }
        },
        computed: mapState({
            pharmacyList: state => state.pharmacyList,
            loading: 'loading',
            pharmacyNames(state) {
                return state.pharmacyList.reduce((acc, currentPharmacy) => {
                    if(!acc.includes(currentPharmacy.local_nombre.trim())) {
                        acc.push(currentPharmacy.local_nombre.trim());
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
            }
        }
    }
</script>

<style>
    /* Panel Izquierdo */
    .panel__left-section {
        width: 100%;
        max-width: 250px;
    }
    .panel__left-section #dropdown-farmacia .btn {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .panel__left-section #dropdown-farmacia .dropdown-menu.show {
        overflow-y: auto !important;
        overflow: hidden;
        height: 300px !important;
        width: 120%
    }
    .panel__left-section #dropdown-farmacia .dropdown-menu li {
        display: block;
    } 
    .panel__left-section #dropdown-farmacia .dropdown-menu li a {
    text-transform: uppercase;
    white-space: pre-wrap;
    }
    .panel__left-section #dropdown-farmacia .dropdown-toggle {
    padding-right: 1rem;
    }
    .panel__left-section #dropdown-farmacia .dropdown-toggle::after {
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
	position: absolute;
    }
</style>