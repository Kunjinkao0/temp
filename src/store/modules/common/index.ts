import { defineStore } from 'pinia';

const commonStore = defineStore('commonStore', {
    state: () => {
        return {
            detailLocal: {},
        };
    },
    getters: {
        getProjectId(state) {
            return state.detailLocal
        },
    },
    actions: {
        setProjectId(params: {}) {
            this.detailLocal = params;
        },
    },
});

export default commonStore;
