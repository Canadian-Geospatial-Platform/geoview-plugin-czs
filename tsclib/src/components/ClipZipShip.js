"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipZipShip = void 0;
/**
 * When using a component that will render inside the GeoView map
 * React needs to be imported
 */
const react_1 = __importDefault(require("react"));
const translation_json_1 = __importDefault(require("../../public/locales/en-CA/translation.json"));
const translation_json_2 = __importDefault(require("../../public/locales/fr-CA/translation.json"));
/**
 * Create a container that renders the map position after the mouse
 * drag on the map has ended
 *
 * @returns {JSX.Element} the map position container
 */
const ClipZipShip = () => {
    // CONFIG
    //const PYGEOAPI_ENDPOINT = "http://10.68.130.170:8080";
    const URL_CLIP = "http://10.68.130.170:8080/processes/clip-process/execution";
    const URL_EXTRACT = "http://10.68.130.170:8080/processes/extract-process/execution";
    // Get a reference to the windows object
    const w = window;
    // Get a reference to Leaflet
    const L = w.L;
    // Get a reference to the geoview api
    const cgpv = w['cgpv'];
    // Import exported modules from the viewer
    const { api, react, ui, mui, useTranslation, leaflet } = cgpv;
    const { InputLabel, Select, MenuItem, FormControl, Box } = mui;
    /** Use react hooks, these hooks uses the viewer's context.
     *  Importing them from the react module at the top will not work.
     */
    const { useState, useEffect, useRef } = react;
    // Get the leaflet dom event
    const { DomEvent } = leaflet;
    // Import another hook used by material ui, again if you import it directly it won't work
    const { makeStyles } = ui;
    // Import the Button
    const { Button, CircularProgress, CheckboxList } = ui.elements;
    // Get the translation object
    const { t } = useTranslation();
    // Some variables
    const mapId = "mapWM";
    // Get the Map instance
    const mapInstance = api.map(mapId);
    const { language } = mapInstance;
    // Add custom languages
    mapInstance.i18nInstance.addResourceBundle('en-CA', 'translation', translation_json_1.default, true, false);
    mapInstance.i18nInstance.addResourceBundle('fr-CA', 'translation', translation_json_2.default, true, false);
    // Style the ClipZipShip
    const useStyles = makeStyles((theme) => ({
        buttonsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        buttonClass: {
            width: 50,
            minWidth: 50,
            'margin-right': 10,
            "& > div": {
                textAlign: "center",
            }
        },
        collectionsClass: {
            'margin-block-start': '1em',
            'margin-block-end': '1em'
        },
        listCollections: {
            'padding-inline-start': 0,
        },
    }));
    // Get the classes for the styles
    const classes = useStyles();
    // State used to store latitude and longtitude after map drag end
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [zoom, setZoom] = useState(0);
    const [collections, setCollections] = useState(["yo"]);
    const [checkedCollections, setCheckedCollections] = useState([]);
    const [features, setFeatures] = useState([]);
    // Show a loading spinner when collections are being loaded
    const [isLoaded, setIsLoaded] = useState(true);
    // The current bounds
    let currentLayer = null;
    let currentGeometry;
    let currentBBoxLCCFlat = [];
    let currentCheckedCollections = [];
    // Working flags
    let doubleClickZoomEnabled = false;
    let drawingRectangle = false;
    // The essential function
    function processGeometryComplete(geom) {
        // Reset the cursor
        L.DomUtil.removeClass(mapInstance.map._container, 'crosshair-cursor-enabled');
        // Is loading
        setIsLoaded(false);
        // Update UI
        setCollections([]);
        // Flush all geometries from vector geometries
        mapInstance.layer.vector.deleteGeometriesFromGroup(mapInstance.layer.vector.getActiveGeometryGroup().id);
        // Create the bbox as defined from the current shape
        let bbox = [[geom._southWest.lng, geom._southWest.lat], [geom._northEast.lng, geom._northEast.lat]];
        // Project to LCC
        let bboxLCC = mapInstance.projection.latLngToLCC(bbox);
        // If the bounding box in lat is higher in the south west than on the north east, reverse them values
        if (bboxLCC[0][1] > bboxLCC[1][1]) {
            let temp = bboxLCC[0][1];
            bboxLCC[0][1] = bboxLCC[1][1];
            bboxLCC[1][1] = temp;
        }
        // Flatten them
        currentBBoxLCCFlat = [];
        bboxLCC.forEach((r) => {
            // Add the 2 coordinates to the flat array
            currentBBoxLCCFlat.push(r[0], r[1]);
        });
        //bboxLLCFlat = [-1176630, 702440, -1175670, 703700]; // 1
        //bboxLLCFlat = [-1176630, 692440, -1175670, 693700]; // 2
        //bboxLLCFlat = [-1176630, 682440, -1175670, 683700]; // 3
        console.log("Query collections", currentBBoxLCCFlat);
        // Get the collections for the bounding box
        mapInstance.getCollections(URL_CLIP, currentBBoxLCCFlat).then((colls) => {
            // Only keep Feature types
            colls = colls.filter((coll) => {
                return coll.type == "feature";
            });
            const items = colls.map((coll, idx) => {
                return coll.collection;
            });
            // Done loading
            setIsLoaded(true);
            // Update UI
            setCollections(items);
            // Update Graphics on Map based on UI
            updateGraphicsFromUI();
        });
    }
    function updateGraphicsFromUI() {
        // For each collection id
        let promises = [];
        currentCheckedCollections.forEach((coll) => {
            // Get the features
            promises.push(mapInstance.getFeatures(URL_EXTRACT, coll, currentBBoxLCCFlat));
        });
        // Once all queries have completed
        Promise.all(promises).then((featureColls) => {
            //console.log("Feature Colls", featureColls)
            // For each feature collections
            featureColls.forEach((features) => {
                // For each feature
                let addedGeometry = null;
                features.forEach((feat) => {
                    if (feat.geometry) {
                        if (feat.geometry.type == "MultiLineString") {
                            // Project to lat long
                            let geom = [];
                            feat.geometry.coordinates.forEach((r) => {
                                // Project to lat long
                                geom.push(mapInstance.projection.lccToLatLng(r));
                            });
                            // Reverse the array because they are x, y instead of default lat long couple y, x
                            geom.forEach((r) => {
                                r.forEach((r2) => {
                                    // Reverse the coordinates
                                    r2.reverse();
                                });
                            });
                            // Add the polyline on the map
                            addedGeometry = mapInstance.layer.vector.addPolyline(geom);
                        }
                        else if (feat.geometry.type == "Point") {
                            // Project to lat long
                            let geom = [];
                            geom.push(mapInstance.projection.lccToLatLng(feat.geometry.coordinates));
                            // Add the marker on the map
                            addedGeometry = mapInstance.layer.vector.addMarker(geom[0][0][1], geom[0][0][0]);
                        }
                    }
                });
            });
        });
    }
    function btnClickDrawRectangle() {
        doubleClickZoomEnabled = mapInstance.map.doubleClickZoom._enabled;
        drawingRectangle = true;
        mapInstance.map.editTools.startRectangle();
        L.DomUtil.addClass(mapInstance.map._container, 'crosshair-cursor-enabled');
    }
    function btnClickDrawPolygon() {
        doubleClickZoomEnabled = mapInstance.map.doubleClickZoom._enabled;
        drawingRectangle = false;
        mapInstance.map.editTools.startPolygon();
        L.DomUtil.addClass(mapInstance.map._container, 'crosshair-cursor-enabled');
    }
    const handleCollectionChanged = (event) => {
        debugger;
        currentCheckedCollections = event;
    };
    const yoyo = () => {
        debugger;
        currentCheckedCollections = [];
    };
    // Render
    useEffect(() => {
        // Listen to the map drawing commit
        mapInstance.map.on('editable:drawing:commit', function (e) {
            console.log("editable:drawing:commit", e.layer.editor.feature);
            // If there was already a layer that was used to draw
            if (currentLayer)
                currentLayer.removeFrom(mapInstance.map);
            // If drawing a rectangle, don't bother here, wait for editable:dragend event to do stuff
            if (drawingRectangle)
                return;
            // Update current variables
            currentLayer = e.layer;
            currentGeometry = e.layer.editor.feature;
            // Start processing the geometry
            processGeometryComplete(currentGeometry.getBounds());
        });
        // Listen to the map drag commit
        mapInstance.map.on('editable:dragend editable:vertex:dragend', function (e) {
            console.log("editable:dragend editable:vertex:dragend", e.layer.editor.feature);
            // If currently drawing
            if (mapInstance.map.editTools.drawing())
                return;
            // Update current variables
            currentLayer = e.layer;
            currentGeometry = e.layer.editor.feature;
            drawingRectangle = false;
            // Start processing the geometry
            processGeometryComplete(currentGeometry.getBounds());
        });
        // Listen to the map click event
        mapInstance.map.on('click', (e) => {
            // Update the state
            if (e.latlng) {
                setLat(e.latlng.lat);
                setLng(e.latlng.lng);
                setZoom(e.target.getZoom());
            }
        });
        // Listen to the map click event
        mapInstance.map.on('click', (e) => {
            // If currently drawing
            if (mapInstance.map.editTools.drawing()) {
                // Make sure the double click to zoom is disabled
                mapInstance.map.doubleClickZoom.disable();
                return;
            }
            console.log("mapInstance.click");
            // If the double click zoom was enabled when the tool was activated
            if (doubleClickZoomEnabled) {
                // Make sure the double click to zoom is reenabled
                mapInstance.map.doubleClickZoom.enable();
            }
        });
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: 'loading-spinner-container' },
            react_1.default.createElement(CircularProgress, { isLoaded: isLoaded, className: 'loading-spinner' })),
        react_1.default.createElement("div", { className: `${classes.buttonsContainer}` },
            react_1.default.createElement(Button, { id: "btnRectangle", className: `${classes.buttonClass}`, tooltip: "Drawing a rectangle on the map", tooltipPlacement: "top", variant: "contained", type: "icon", icon: '<i class="material-icons">check_box_outline_blank</i>', onClick: btnClickDrawRectangle }),
            react_1.default.createElement(Button, { id: "btnPolygon", className: `${classes.buttonClass}`, tooltip: "Drawing a polygon on the map", tooltipPlacement: "top", variant: "contained", type: "icon", icon: '<i class="material-icons">format_shapes</i>', onClick: btnClickDrawPolygon })),
        react_1.default.createElement("div", { className: `${classes.collectionsClass}` },
            react_1.default.createElement(CheckboxList, { listItems: collections, checkedItems: checkedCollections, multiselect: true, onChange: yoyo, checkedCallback: handleCollectionChanged })),
        react_1.default.createElement("div", { className: `${classes.collectionsClass}` },
            "Features:",
            react_1.default.createElement("ol", null, features)),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                "Latitude: ",
                lat),
            react_1.default.createElement("p", null,
                "Longitude: ",
                lng),
            react_1.default.createElement("p", null,
                "Zoom: ",
                zoom))));
};
exports.ClipZipShip = ClipZipShip;
//# sourceMappingURL=ClipZipShip.js.map