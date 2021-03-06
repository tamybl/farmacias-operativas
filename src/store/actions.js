import axios  from 'axios';

const API_URL = 'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion';

export const actions = {
    getLocals({commit}) {
        axios.get(API_URL+'?id_region=7')
        .then((response) => {
            commit('updateLocals', response.data); 
            commit('loadingStatus', false);
        })
    },
    setFilterName({commit}, pharmacy) {
        commit('updateActivePharmacy', pharmacy); 
    },
    setFilterCommune({commit}, commune) {
        commit('updateActiveCommune', commune); 
    }
    
}