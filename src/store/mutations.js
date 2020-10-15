export const mutations = {
    updateLocals (state, payload) {
        state.pharmacyList = payload;
    },
    loadingStatus(state, payload) {
        state.loading = payload;
    },
    updateActivePharmacy(state, payload) {
        state.activePharmacy = payload;
    }
}