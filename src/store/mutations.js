export const mutations = {
    updateLocals (state, locals) {
        state.pharmacyList = locals;
    },
    loadingStatus(state, loading) {
        state.loading = loading;
    }
}