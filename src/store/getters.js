export const getters = {
    filteredLocationsPharmacy: state => {
       
        return state.activePharmacy === '' ? state.pharmacyList : state.pharmacyList.filter(pharmacyItem => pharmacyItem.local_nombre.trim() === state.activePharmacy);
    },
    filteredLocationsCommune: state => {
        return state.activeCommune === '' ? state.pharmacyList : state.pharmacyList.filter(pharmacyItem => pharmacyItem.comuna_nombre.trim() === state.activeCommune);
    },
    filteredLocationsMap: state => {
        const filtered = (arr, key, val) => {
            return arr.filter(arrItem => arrItem[key].trim() === val)
        }
        var filteredByPharmacy = state.activePharmacy === '' ? state.pharmacyList :  filtered(state.pharmacyList, 'local_nombre', state.activePharmacy);
        var filteredByCommune = state.activeCommune === '' ? filteredByPharmacy :  filtered(filteredByPharmacy, 'comuna_nombre', state.activeCommune);

        return filteredByCommune;
    }
}