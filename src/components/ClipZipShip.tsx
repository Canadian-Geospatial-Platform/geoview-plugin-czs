/**
 * IMPORTANT NOTE:
 * Because this is a component that will render on top of the GeoView viewer,
 * you will only be able to use hooks exported from the viewer. All react hooks
 * are exported by default. The reason for this is because this component will
 * render inside the viewer which already has a context, this component will be
 * injected to use that context. Using hooks created outside of the viewer will
 * create a new context and will not work.
 * See below for example of how hooks are imported from the viewer.
 */

/**
 * When using a component that will render inside the GeoView map
 * React needs to be imported
 */
import React from 'react';

import translationEn from '../../public/locales/en-CA/translation.json';
import translationFr from '../../public/locales/fr-CA/translation.json';

/**
 * Create a container that renders the map position after the mouse
 * drag on the map has ended
 *
 * @returns {JSX.Element} the map position container
 */
export const ClipZipShip = (): JSX.Element => {


  // CONFIG
  //const PYGEOAPI_ENDPOINT = "http://10.68.130.170:8080";
  const URL_CLIP = "http://10.68.130.170:8080/processes/clip-process/execution";
  const URL_EXTRACT = "http://10.68.130.170:8080/processes/extract-process/execution";


  // Get a reference to the windows object
  const w = window as any;

  // Get a reference to Leaflet
  const L = w.L as any;

  // Get a reference to the geoview api
  const cgpv = w['cgpv'];

  // Import exported modules from the viewer
  const { api, react, ui, mui, useTranslation, leaflet } = cgpv;

  /** Use react hooks, these hooks uses the viewer's context.
   *  Importing them from the react module at the top will not work.
   */
  const { useState, useEffect, useRef } = react;

  // Get the leaflet dom event
  const { DomEvent } = leaflet;

  // Import another hook used by material ui, again if you import it directly it won't work
  const { makeStyles } = ui;

  // Import the Button
  const { Button } = ui.elements;

  // Get the translation object
  const { t } = useTranslation();

  // Some variables
  const mapId = "mapWM";

  // Get the Map instance
  const mapInstance = api.map(mapId);
  const { language } = mapInstance;

  // Add custom languages
  mapInstance.i18nInstance.addResourceBundle(
    'en-CA',
    'translation',
    translationEn,
    true,
    false,
  );
  mapInstance.i18nInstance.addResourceBundle(
    'fr-CA',
    'translation',
    translationFr,
    true,
    false,
  );

  

  // State used to store latitude and longtitude after map drag end
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [collections, setCollections] = useState([]);
  //const [mapLayers, setMapLayers] = useState({});

  // ??
  //const positionContainerRef = useRef();

  // Style the ClipZipShip
  const useStyles = makeStyles((theme: any) => ({
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
    },
    
    buttonClass: {
      width: 50,
      minWidth: 50,
      "& > div": {
        textAlign: "center",
      }
    },

    listCollections: {
      'padding-inline-start': 0,
    },
  }));

  // Get the classes for the styles
  const classes = useStyles();

  // The current bounds
  let currentLayer: L.Layer = null;
  let currentGeometry: object = null;
  let doubleClickZoomEnabled: boolean = false;
  let drawingRectangle: boolean = false;


   


  // The essential function
  function processGeometryComplete(geom) {
    // Reset the cursor
    L.DomUtil.removeClass(mapInstance.map._container,'crosshair-cursor-enabled');

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
    let bboxLLCFlat: Array<number> = [];
    bboxLCC.forEach((r: Array<number>) => {
      // Add the 2 coordinates to the flat array
      bboxLLCFlat.push(r[0], r[1]);
    });

    //bboxLLCFlat = [-1176630, 702440, -1175670, 703700]; // 1
    //bboxLLCFlat = [-1176630, 692440, -1175670, 693700]; // 2
    //bboxLLCFlat = [-1176630, 682440, -1175670, 683700]; // 3

    console.log("BBOX", bboxLLCFlat);

    // Get the collections for the bounding box
    mapInstance.getCollections(URL_CLIP, bboxLLCFlat).then((colls: Array<object>) => {
      // Only keep Feature types
      colls = colls.filter((coll) => {
        return coll.Type == "Feature";
      });

      const items = colls.map((coll, idx) => {
        return <li key={coll.collectionId} data-id={coll.collectionId}>{coll.collectionId}</li>;
      });

      // Update UI
      setCollections(items);

      // For each collection id
      let promises: Array<Array<object>> = [];
      colls.forEach((coll) => {
        // Get the features
        promises.push(mapInstance.getFeatures(URL_EXTRACT, coll.collectionId, bboxLLCFlat));
      });

      // Once all queries have completed
      Promise.all(promises).then((featureColls: Array<Array<object>>) => {
        //console.log("Feature Colls", featureColls)

        // For each feature collections
        featureColls.forEach((features) => {
          // For each feature
          let addedGeometry: object = null;
          features.forEach((feat) => {
            if (feat.geometry) {
              if (feat.geometry.type == "MultiLineString") {
                // Project to lat long
                let geom: Array<Array<Array<number>>> = [];
                feat.geometry.coordinates.forEach((r: Array<number>) => {
                  // Project to lat long
                  geom.push(mapInstance.projection.lccToLatLng(r));
                });

                // Reverse the array because they are x, y instead of default lat long couple y, x
                geom.forEach((r: Array<Array<number>>) => {
                  r.forEach((r2: Array<number>) => {
                    // Reverse the coordinates
                    r2.reverse();
                  })
                });

                // Add the polyline on the map
                addedGeometry = mapInstance.layer.vector.addPolyline(geom);
              }

              else if (feat.geometry.type == "Point") {
                // Project to lat long
                let geom: Array<number> = [];
                geom.push(mapInstance.projection.lccToLatLng(feat.geometry.coordinates));
                
                // Add the marker on the map
                addedGeometry = mapInstance.layer.vector.addMarker(geom[0][0][1], geom[0][0][0]);
              }
            }
          });
        });
      });
    });
  }

  function btnClickDrawRectangle(): void {
    doubleClickZoomEnabled = mapInstance.map.doubleClickZoom._enabled;
    drawingRectangle = true;
    mapInstance.map.editTools.startRectangle();
    L.DomUtil.addClass(mapInstance.map._container,'crosshair-cursor-enabled');
  }

  function btnClickDrawPolygon(): void {
    doubleClickZoomEnabled = mapInstance.map.doubleClickZoom._enabled;
    drawingRectangle = false;
    mapInstance.map.editTools.startPolygon();
    L.DomUtil.addClass(mapInstance.map._container,'crosshair-cursor-enabled');
  }

  // Render
  useEffect(() => {

    // Listen to the map drawing commit
    mapInstance.map.on('editable:drawing:commit', function (e) {
      console.log("editable:drawing:commit", e.layer.editor.feature);

      // If there was already a layer that was used to draw
      if (currentLayer)
        currentLayer.removeFrom(mapInstance.map);
      
      // If drawing a rectangle, don't bother here, wait for editable:dragend event to do stuff
      if (drawingRectangle) return;

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
      if (mapInstance.map.editTools.drawing()) return;

      // Update current variables
      currentLayer = e.layer;
      currentGeometry = e.layer.editor.feature;
      drawingRectangle = false;

      // Start processing the geometry
      processGeometryComplete(currentGeometry.getBounds());
    });

    // Listen to the map click event
    mapInstance.map.on('click', (e: any) => {
      // Update the state
      if (e.latlng) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        setZoom(e.target.getZoom());
      }
    });

    // Listen to the map click event
    mapInstance.map.on('click', (e: any) => {
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


  return (
    <div>
      <div className={`${classes.buttonsContainer}`}>
        <Button
          id="btnRectangle"
          className={`${classes.buttonClass}`}
          tooltip="Drawing a rectangle on the map"
          tooltipPlacement="top"
          variant="contained"
          type="icon"
          icon='<i class="material-icons">check_box_outline_blank</i>'
          onClick={btnClickDrawRectangle}
          >
        </Button>
        <Button
          id="btnPolygon"
          className={`${classes.buttonClass}`}
          tooltip="Drawing a polygon on the map"
          tooltipPlacement="top"
          variant="contained"
          type="icon"
          icon='<i class="material-icons">format_shapes</i>'
          onClick={btnClickDrawPolygon}
          >
        </Button>
      </div>
      <p>Collections:</p>
      <ol>{collections}</ol>
      <hr></hr>
      <div>
        <p>Latitude: {lat}</p>
        <p>Longitude: {lng}</p>
        <p>Zoom: {zoom}</p>
      </div>
    </div>
  );
};
