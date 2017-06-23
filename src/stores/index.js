import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const state = {
    'markers': [],
    'places': [],
    'averageMarker': {},
    'visiblePanel': 'markers',
    'showPanelDetail': false
};

const mutations = {
    setVisiblePanel (state, payload) {
        state.visiblePanel = payload.name;
    },
    setAverageMarker (state, payload) {
        state.averageMarker = payload;
    },
    addMarker (state, payload) {
        state.markers.unshift(payload);
    },
    clearMarkers (state) {
        _.each(state.markers, (marker) => {
            marker.bubble.setMap(null);
            marker.setMap(null);
        });
        state.markers = [];
    },
    replacePlaces (state, payload) {
        state.places = payload.places;
    },
    togglePanelDetail (state) {
        state.showPanelDetail = state.showPanelDetail !== true;
    },
    hidePanelDetail (state) {
        state.showPanelDetail = false;
    },
    clearAverageMarker (state) {
        if (typeof state.averageMarker.setMap !== 'undefined') {
            state.averageMarker.setMap(null);
            state.averageMarker = {};
        }
    }
};

const getters = {
    isMarkersPanelVisible: (state) => {
        return state.visiblePanel === 'markers';
    },
    isPlacesPanelVisible: (state) => {
        return state.visiblePanel === 'places';
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
        return state[state.visiblePanel];
    },
    showPanelDetail: (state) => {
        return state.showPanelDetail;
    },
    averageMarker: (state) => {
        return state.averageMarker;
    }
};

const store = new Vuex.Store({
    state,
    getters,
    mutations
});

export default store;