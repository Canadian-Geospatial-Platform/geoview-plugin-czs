"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/core/styles");
const ClipZipShip_1 = require("./ClipZipShip");
/**
 * Main container and map styling
 */
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    container: {
        height: '100%',
    }
}));
// get reference to window object
const w = window;
// get reference to geoview apis
const cgpv = w['cgpv'];
/**
 * Create a container containing a leaflet map using the GeoView viewer
 *
 * @returns {JSX.Elemet} the element that creates the container and the map
 */
const App = () => {
    // Get the classes for the styles
    const classes = useStyles();
    /**
     * initialize the map after it has been loaded
     */
    (0, react_1.useEffect)(() => {
        cgpv.init(() => {
            // create a new component on the leaflet map after it has been rendered
            var _a, _b;
            // Some variables
            const mapId = "mapWM";
            // Get the Map instance
            const mapInstance = cgpv.api.map(mapId);
            // Button props
            const button = mapInstance.getButtonProps("clipZipShipButton", "Clip Zip Ship", "dynamic_form");
            // Panel props
            const panel = mapInstance.getPanelProps("clipZipShipPanel", "Clip Zip Ship", "dynamic_form");
            // Create a new button panel on the appbar
            const buttonPanel = cgpv.api.map(mapId).appBarButtons.createAppbarPanel(button, panel, null);
            // Set panel content
            (_a = buttonPanel.panel) === null || _a === void 0 ? void 0 : _a.changeContent(react_1.default.createElement(ClipZipShip_1.ClipZipShip, null));
            // Open it by default
            (_b = buttonPanel.panel) === null || _b === void 0 ? void 0 : _b.open();
            // Load the layers panel plugin
            cgpv.api.addPlugin('layersPanel', mapId, w.plugins['layersPanel'], { mapId: mapId });
        });
    }, []);
    return (react_1.default.createElement("div", { className: classes.container },
        react_1.default.createElement("div", { id: "mapWM", className: "llwp-map", style: {
                height: '100%',
            }, "data-leaflet": "{\r\n          'name': 'Clip Zip Ship Map',\r\n          'zoom': 13,\r\n          'projection': 3978,\r\n          'center': [53.54, -113.35],\r\n          'language': 'en-CA',\r\n          'basemapOptions': {\r\n            'id': 'transport',\r\n            'shaded': false,\r\n            'labeled': true\r\n          },\r\n          'layers': [{\r\n            'id':'wmsLYR1',\r\n            'name': 'Premi\u00E8re Nation / First Nation',\r\n            'url': 'https://services.aadnc-aandc.gc.ca/geomatics/services/Donnees_Ouvertes-Open_Data/Premiere_Nation_First_Nation/MapServer/WMSServer',\r\n            'type': 'ogcWMS',\r\n            'entries': '0'\r\n          },{\r\n            'id':'wmsLYR2',\r\n            'name': 'Energy Dynamic',\r\n            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer',\r\n            'type': 'esriDynamic',\r\n            'entries': '4, 5, 10'\r\n          },{\r\n            'id':'wmsLYR3',\r\n            'name': 'Energy Feature',\r\n            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer/1',\r\n            'type': 'esriFeature'\r\n          },{\r\n            'id':'wmsLYR4',\r\n            'name': 'Topographic OSM WMS',\r\n            'url': 'https://maps-cartes.services.geo.ca/server_serveur/services/NRCan/CanEcumeneV2_en/MapServer/WMSServer',\r\n            'type': 'ogcWMS',\r\n            'entries': '0,1,2,3,4,5,6,7,8,9'\r\n          }],\r\n          'extraOptions': {\r\n            'editable': true\r\n          },\r\n          'plugins': []\r\n        }" })));
};
exports.default = App;
//# sourceMappingURL=App.js.map