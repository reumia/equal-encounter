import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    'showPanel': undefined,
    'showDetail': undefined
};

const mutations = {
    visiblePanel (state, payload) {
        state.showPanel = payload.name;
    }
};

const actions = {
    setVisiblePanel (context, payload) {
        context.commit('visiblePanel', payload);
    }
};

const getters = {
    isMarkersPanelVisible: (state) => {
        return state.showPanel === 'markers';
    },
    isPlacesPanelVisible: (state) => {
        return state.showPanel === 'places';
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});