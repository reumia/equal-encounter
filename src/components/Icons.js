'use strict';

import markerRed from '../assets/icon-marker-red.svg';
import markerOrange from '../assets/icon-marker-orange.svg';
import markerYellow from '../assets/icon-marker-yellow.svg';
import markerGreen from '../assets/icon-marker-green.svg';
import markerBlue from '../assets/icon-marker-blue.svg';
import markerViolet from '../assets/icon-marker-violet.svg';
import markerRainbow from '../assets/icon-marker-rainbow.svg';
import starOff from '../assets/icon-star-off.svg';
import starOn from '../assets/icon-star-on.svg';

let icons, markerIcons, averageMarkerIcon, starIcons;

icons = {
    'markerRed': {
        url: markerRed,
        size: {
            x: 20,
            y: 20
        }
    },
    'markerOrange': {
        url: markerOrange,
        size: {
            x: 20,
            y: 20
        }
    },
    'markerYellow': {
        url: markerYellow,
        size: {
            x: 20,
            y: 20
        }
    },
    'markerGreen': {
        url: markerGreen,
        size: {
            x: 20,
            y: 20
        }
    },
    'markerBlue': {
        url: markerBlue,
        size: {
            x: 20,
            y: 20
        }
    },
    'markerViolet': {
        url: markerViolet,
        size: {
            x: 20,
            y: 20
        }
    },
    'markerRainbow': {
        url: markerRainbow,
        size: {
            x: 30,
            y: 30
        }
    },
    'starOff': {
        url: starOff,
        size: {
            x: 14,
            y: 14
        }
    },
    'starOn': {
        url: starOn,
        size: {
            x: 14,
            y: 14
        }
    }
};

markerIcons = [
    icons.markerRed,
    icons.markerOrange,
    icons.markerYellow,
    icons.markerGreen,
    icons.markerBlue,
    icons.markerViolet,
];

averageMarkerIcon = icons.markerRainbow;

starIcons = {
    off: icons.starOff,
    on: icons.starOn
};

export {
    icons as default,
    markerIcons,
    averageMarkerIcon,
    starIcons
}