import React from 'react';

import translationEn from '../../public/locales/en-CA/translation.json';
import translationFr from '../../public/locales/fr-CA/translation.json';

import { ClipZipShipAPI,
         CLIP_ZIP_SHIP_LOADING_SPINNER,
         CLIP_ZIP_SHIP_LOADING_COLLECTIONS,
         CLIP_ZIP_SHIP_LOADING_FEATURES,
         PyGeoAPIFeaturesResponsePayload } from "./ClipZipShipAPI";
import { FeaturesList, FeatureCollectionItem } from './FeaturesList';


/**
 * Type to create a ClipZipShip UI element
 */
export type ClipZipShipProps = {
  // ClipZipShip ID
  id?: string;
  mapId: string;
};

export class ThemeCollections {
  theme: ThemeItem;
  collections: Array<CollectionItem>;

  constructor(theme: ThemeItem, collections: Array<CollectionItem>) {
    this.theme = theme;
    this.collections = collections;
  }
};

export type ThemeItem = {
  id: string;
  name: string;
};

export type CollectionItem = {
  id: string;
  type: string;
  name: string;
};


// Events
export const CLIP_ZIP_SHIP_GEOMETRY_STARTED: string = "CLIP_ZIP_SHIP_GEOMETRY_STARTED";
export const CLIP_ZIP_SHIP_COLLECTIONS_CHANGED: string = "CLIP_ZIP_SHIP_COLLECTIONS_CHANGED";
export const CLIP_ZIP_SHIP_FEATURE_HOVER_ON: string = "CLIP_ZIP_SHIP_FEATURE_HOVER_ON";
export const CLIP_ZIP_SHIP_FEATURE_HOVER_OFF: string = "CLIP_ZIP_SHIP_FEATURE_HOVER_OFF";


/**
 * Create a ClipZipShip UI element
 *
 * @returns {JSX.Element} the Clip Zip Ship UI element
 */
export function ClipZipShip(props: ClipZipShipProps): JSX.Element {

  // Get a reference to the windows object
  const w = window as any;

  // Get a reference to Leaflet
  const L = w.L as any;

  // Get a reference to the geoview api
  const cgpv = w['cgpv'];

  // Import exported modules from the viewer
  const { api, react, ui, useTranslation } = cgpv;

  //const { InputLabel, Select, MenuItem, FormControl, Box } = mui;

  /** Use react hooks, these hooks uses the viewer's context.
   *  Importing them from the react module at the top will not work.
   */
  const { useState, useEffect } = react;

  // Get the leaflet dom event
  //const { DomEvent } = leaflet;

  // Import another hook used by material ui, again if you import it directly it won't work
  const { makeStyles } = ui;

  // Import the Button
  const { Button, CircularProgress, CheckboxList, Accordion } = ui.elements;

  // Get the translation object
  const { t } = useTranslation();

  // Some variables
  const mapId = props.mapId;

  // Get the Map instance
  const mapInstance = api.map(mapId);
  //const { language } = mapInstance;

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

  // Style the ClipZipShip
  const useStyles = makeStyles((theme: any) => ({
    buttonsContainer: {
      display: "flex",
      flexDirection: "row",
      "margin-bottom": "20px"
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
      'margin-block-start': '1em'
    },

    listCollections: {
      'padding-inline-start': 0
    },

    deprecatedInfo: {
      display: 'none'
    }
  }));

  // Get the classes for the styles
  const classes = useStyles();

  // State used to store latitude and longtitude after map drag end
  const [collections, _setCollections] = useState([]);  // TODO: BE ABLE TO DO useState<> using react from core!?
  const [checkedCollections, _setCheckedCollections] = useState([]);
  const [featuresCollections, _setFeaturesCollections] = useState([]);

  // Show a loading spinner when collections are being loaded
  const [isLoading, _setIsLoading] = useState(false);
  
  function btnClickDrawRectangle(): void {
    mapInstance.map.editTools.startRectangle();
    onStartDrawing(true);
  }

  function btnClickDrawPolygon(): void {
    mapInstance.map.editTools.startPolygon();
    onStartDrawing(false); 
  }

  function btnClickUseMapExtent(): void {
    // Get extent
    let bounds: L.Bounds = mapInstance.map.getBounds();
    
    // Get coordinates array
    let coordinates: Array<Array<number>> = [[bounds.getSouth(), bounds.getWest()],
                                             [bounds.getNorth(), bounds.getWest()],
                                             [bounds.getNorth(), bounds.getEast()],
                                             [bounds.getSouth(), bounds.getEast()]];

    // Create the polygon
    let polygon: L.polygon = L.polygon(coordinates);

    // Add it to the map
    polygon.addTo(mapInstance.map);
    
    // Make the polygon editable
    polygon.enableEdit();

    // Started "drawing"
    onStartDrawing(false);

    // Commit right away
    polygon.editor.commitDrawing(polygon);
  }

  function onStartDrawing(rectangle: boolean): void {
    // Crosshair cursor
    L.DomUtil.addClass(mapInstance.map._container,'crosshair-cursor-enabled');

    // Emit that started drawing
    api.event.emit(CLIP_ZIP_SHIP_GEOMETRY_STARTED, mapId, {
      rectangle: rectangle
    });
  }

  function onCollectionCheckedChanged(themeColl: Array<ThemeCollections>, checkedColls: Array<string>): void {
    debugger;
    // Proceed to change the state
    _setCheckedCollections(checkedColls);

    // Emit that the selected collections changed
    api.event.emit(CLIP_ZIP_SHIP_COLLECTIONS_CHANGED, mapId, {
      collections: checkedColls
    });
  };

  function onFeatureHoverOn(feature: object): void {
    // Emit that the geometry changed
    api.event.emit(CLIP_ZIP_SHIP_FEATURE_HOVER_ON, mapId, {
      feature: feature
    });
  };

  function onFeatureHoverOff(feature: object): void {
    // Emit that the geometry changed
    api.event.emit(CLIP_ZIP_SHIP_FEATURE_HOVER_OFF, mapId, {
      feature: feature
    });
  };

  // Render
  useEffect(() => {

    // Listen to the clip zip ship loading event
    api.event.on(
      CLIP_ZIP_SHIP_LOADING_SPINNER,
      (payload: any) => {
        //console.log("HANDLE ELEMENT : CLIP_ZIP_SHIP_LOADING_SPINNER");
        _setIsLoading(payload.isLoading);
      },
      mapId
    );

    // Listen to the clip zip ship loading collections event
    api.event.on(
      CLIP_ZIP_SHIP_LOADING_COLLECTIONS,
      (payload: any) => {
        //console.log("HANDLE ELEMENT : CLIP_ZIP_SHIP_LOADING_COLLECTIONS", payload.collections, payload.checkedCollections);
        
        // Set the collections
        if (payload.collections) {
          // Proceed to change the state
          _setCollections(payload.collections);
        }

        // Set the checked collections
        if (payload.checkedCollections) {
          // Proceed to change the state
          _setCheckedCollections(payload.checkedCollections);
        }
      },
      mapId
    );

    // Listen to the clip zip ship loading features event
    api.event.on(
      CLIP_ZIP_SHIP_LOADING_FEATURES,
      (payload: Array<PyGeoAPIFeaturesResponsePayload>) => {
        //console.log("HANDLE ELEMENT : CLIP_ZIP_SHIP_LOADING_FEATURES", payload.features);

        // Build
        let features: Array<FeatureCollectionItem> = [];
        payload.data.map((featColl: PyGeoAPIFeaturesResponsePayload) => {
          // If a feature collection
          console.log("FEATURE", featColl);
          
          if (featColl.data.type == "FeatureCollection") {
            let value: FeatureCollectionItem = {
              collection: featColl.collection,
              attributes: ["id", "province", "location", "project_name", "capital_cost"],
              features: featColl.data.features
            };
            features.push(value);
          }

          else if (featColl.data.type == "Coverage") {
            let value: FeatureCollectionItem = {
              collection: featColl.collection,
              attributes: ["pixel_count"],
              features: [{
                properties: {
                  pixel_count: featColl.data.cntPixel
                }
              }]
            };
            features.push(value);
          }
        });

        // Proceed to change the state
        _setFeaturesCollections(features);
      },
      mapId
    );
  }, []);

  return (
    <div>
      <div className='loading-spinner-container'>
        <CircularProgress
          isLoaded={!isLoading}
          className='loading-spinner'
        />
      </div>
      <div>Area:</div>
      <div className={`${classes.buttonsContainer}`}>
        <Button
          id="btnRectangle"
          className={`${classes.buttonClass}`}
          tooltip={t('custom.areaRectangle')}
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
          tooltip={t('custom.areaPolygon')}
          tooltipPlacement="top"
          variant="contained"
          type="icon"
          icon='<i class="material-icons">format_shapes</i>'
          onClick={btnClickDrawPolygon}
          >
        </Button>
        <Button
          id="btnPolygon"
          className={`${classes.buttonClass}`}
          tooltip={t('custom.areaMapExtent')}
          tooltipPlacement="top"
          variant="contained"
          type="icon"
          icon='<i class="material-icons">visibility</i>'
          onClick={btnClickUseMapExtent}
          >
        </Button>
      </div>
      {Object.values(collections).map((thmColl) => (
        <div>
          <Accordion
            items={
              [{
                title: thmColl.theme + " (" + thmColl.collections.length + ")",
                content: <CheckboxList
                    multiselect={true}
                    listItems={Object.values(thmColl.collections).map((coll) => {
                      return {
                        display: coll.name,
                        value: coll.id
                      };
                    })}
                    checkedValues={checkedCollections}
                    checkedCallback={(e: Array<string>) => onCollectionCheckedChanged(thmColl, e)}>
                  </CheckboxList>
              }]
            }>
          </Accordion>
         </div>
        ))}
      <div className={`${classes.collectionsClass}`}>Features:</div>
      <div>
        <FeaturesList
          featuresCollections={featuresCollections}
          hoverOnCallback={onFeatureHoverOn}
          hoverOutCallback={onFeatureHoverOff}
        ></FeaturesList>
      </div>
    </div>
  );
};
