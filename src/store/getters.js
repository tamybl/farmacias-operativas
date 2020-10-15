export const getters = {
    filteredLocations: state => {
        const filtered = (arr, key) => {
            arr.filter(arrItem => {
                arrItem[key] == state.activePharmacy;
            })
        }
        var filteredByPharmacy = state.activePharmacy === '' ? state.pharmacyList :  filtered(state.pharmacyList, 'local_nombre');
        var filteredByCommune = state.activePharmacy === '' ? state.pharmacyList :  filtered(filteredByPharmacy, 'local_nombre');
        
        return filteredByCommune;
        //return state.pharmacyList.filter(pharmacy => pharmacy.local_nombre.trim() == state.activePharmacy);
    },
}