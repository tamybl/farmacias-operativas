export const getters = {
    filteredLocations: state => {
        const filtered = (arr, key, val) => {
            return arr.filter(arrItem => arrItem[key].trim() === val)
        }
        var filteredByPharmacy = state.activePharmacy === '' ? state.pharmacyList :  filtered(state.pharmacyList, 'local_nombre', state.activePharmacy);
        var filteredByCommune = state.activeCommune === '' ? filteredByPharmacy :  filtered(filteredByPharmacy, 'comuna_nombre', state.activeCommune);

        return filteredByCommune;
    }
}