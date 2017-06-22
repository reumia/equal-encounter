import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    'markers': [],
    'places': [],
    'showPanel': 'markers',
    'showDetail': false
};

const mutations = {
    visiblePanel (state, payload) {
        state.showPanel = payload.name;
    },
    replaceData (state, payload) {
        state[payload.target] = payload.data;
    }
};

const actions = {
    setPanel (context, payload) {
        context.commit('visiblePanel', payload);
    },
    replaceData (context, payload) {
        context.commit('replaceData', payload);
    }
};

const getters = {
    isMarkersPanelVisible: (state) => {
        return state.showPanel === 'markers';
    },
    isPlacesPanelVisible: (state) => {
        return state.showPanel === 'places';
    },
    markers: (state) => {
        return state.markers;
    },
    markersLength: (state) => {
        return state.markers.length;
    },
    places: (state) => {
        return state.places;
    },
    placesLength: (state) => {
        return state.places.length;
    },
    panelData: (state) => {
        return state[state.showPanel];
    }
};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

store.watch(getters.markers, () => {

});

export default store;