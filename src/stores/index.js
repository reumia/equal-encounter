import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    'markers': [],
    'places': [],
    'visiblePanel': 'markers',
    'showPanelDetail': false
};

const mutations = {
    setVisiblePanel (state, payload) {
        state.visiblePanel = payload.name;
    },
    replaceState (state, payload) {
        state[payload.target] = payload.data;
    },
    togglePanelDetail (state) {
        state.showPanelDetail = state.showPanelDetail !== true;
    },
    hidePanelDetail (state) {
        state.showPanelDetail = false;
    }
};

const actions = {
    setPanel (context, payload) {
        context.commit('setVisiblePanel', payload);
    },
    replaceState (context, payload) {
        context.commit('replaceState', payload);
    },
    togglePanelDetail (context) {
        context.commit('togglePanelDetail');
    },
    hidePanelDetail (context) {
        context.commit('hidePanelDetail');
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
    },
    showPanelDetail: (state) => {
        return state.showPanelDetail;
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