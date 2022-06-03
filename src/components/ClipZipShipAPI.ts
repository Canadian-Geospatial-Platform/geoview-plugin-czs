import { createElement } from "react";

import { ClipZipShip,
         CLIP_ZIP_SHIP_GEOMETRY_STARTED,
         CLIP_ZIP_SHIP_GEOMETRY_CONFIRM,
         CLIP_ZIP_SHIP_COLLECTIONS_CHANGED,
         CLIP_ZIP_SHIP_FIND_FEATURES,
         CLIP_ZIP_SHIP_FEATURE_HOVER_ON,
         CLIP_ZIP_SHIP_FEATURE_HOVER_OFF,
         ThemeCollections, CollectionItem, StacItem, CheckedCollItem } from "./ClipZipShip";

// Events
export const CLIP_ZIP_SHIP_GEOMETRY_CHANGED: string = "CLIP_ZIP_SHIP_GEOMETRY_CHANGED";
export const CLIP_ZIP_SHIP_LOADING_SPINNER: string = "CLIP_ZIP_SHIP_LOADING_SPINNER";
export const CLIP_ZIP_SHIP_LOADING_COLLECTIONS: string = "CLIP_ZIP_SHIP_LOADING_COLLECTIONS";
export const CLIP_ZIP_SHIP_LOADING_FEATURES: string = "CLIP_ZIP_SHIP_LOADING_FEATURES";

const GEOMETRY_GROUP_FEATURES: string = "GEOM_GROUP_FEATURES";
const GEOMETRY_GROUP_HOVER: string = "GEOM_GROUP_HOVER";

export type GeometryPayload = {
  geometry: L.Path;
  layer: L.Layer;
};

export type PyGeoAPICollectionsResponsePayload = {
  collections: Array<PyGeoAPICollectionsCollectionResponsePayload>
};

export type PyGeoAPICollectionsCollectionResponsePayload = {
  id: string;
  itemType: string;
  title: string;
  theme: string;
  description: string;
}

export type PyGeoAPIFeaturesResponsePayload = {
  collection: string;
  data: object;
};


/**
 * Class used to handle ClipZipShip
 *
 * @export
 * @class ClipZipShipAPI
 */
export class ClipZipShipAPI {

  // Get a reference to the geoview api
  cgpv;

  // The map id
  mapId: string;

  // The url the clip
  urlClip: string;

  // The url to extract (features and coverages)
  urlFeaturesExtract: string;
  urlCoverageExtract: string;

  // The map instance
  mapInstance: object;

  // The clip zip ship element
  clipZipShip: JSX.Element;

  clipGeometry?: object;
  clipGeometryIsRectangle: boolean = false;
  clipLayer?: L.Layer;
  themeColls: Array<ThemeCollections> = [];
  checkedCollections: object = {};
  flagJustDraggedVertex: boolean = false;
  doubleClickZoomEnabled: boolean = false;

  
  constructor(mapId: string, urlClip: string, urlFeaturesExtract: string, urlCoverageExtract: string) {
    // Get a reference to the windows object
    let w = window as any;

     // Get a reference to Leaflet
    let L = w.L as any;

    // Get a reference to the geoview api
    this.cgpv = w['cgpv'];

    // Keep the map id
    this.mapId = mapId;
    this.urlClip = urlClip;
    this.urlFeaturesExtract = urlFeaturesExtract;
    this.urlCoverageExtract = urlCoverageExtract;

    // Get the Map instance
    this.mapInstance = this.cgpv.api.map(mapId);

    // Create the Clip Zip Ship element
    this.clipZipShip = createElement(ClipZipShip, {mapId: mapId});

    // Create geometry group to hold the features
    this.mapInstance.layer.vector.createGeometryGroup(GEOMETRY_GROUP_FEATURES);

    // Create geometry group to hold the hovered feature
    this.mapInstance.layer.vector.createGeometryGroup(GEOMETRY_GROUP_HOVER);

    // Listen to the geometry created event
    this.cgpv.api.event.on(
      CLIP_ZIP_SHIP_GEOMETRY_STARTED,
      (payload: object) => {
        //console.log("HANDLE API : CLIP_ZIP_SHIP_GEOMETRY_STARTED", payload.geometry);
        
        // Crosshair cursor
        L.DomUtil.addClass(this.mapInstance.map._container,'crosshair-cursor-enabled');

        // Keep flag is started drawing a rectangle
        this.clipGeometryIsRectangle = payload.rectangle;

        // Make sure the double click to zoom is disabled
        this.doubleClickZoomEnabled = this.mapInstance.map.doubleClickZoom._enabled;
        this.mapInstance.map.doubleClickZoom.disable();
      },
      mapId
    );

    // Listen to the confirm AOI button
    this.cgpv.api.event.on(
      CLIP_ZIP_SHIP_GEOMETRY_CONFIRM,
      (payload: object) => {
        //console.log("HANDLE API : CLIP_ZIP_SHIP_GEOMETRY_CONFIRM", payload);

        // Convert the color
        this.clipGeometry.setStyle({color: "orange"});
        this.startFindingCollections(this.clipGeometry);
      },
      mapId
    );

    // Listen to the collections changed event
    this.cgpv.api.event.on(
      CLIP_ZIP_SHIP_COLLECTIONS_CHANGED,
      (payload: object) => {
        //console.log("HANDLE API : CLIP_ZIP_SHIP_COLLECTIONS_CHANGED", payload.collections);

        console.log(payload);
        
        // Find the stored checked state for the theme or start a new one
        let checkedCollItem = (payload.themeCollection.theme.id in this.checkedCollections && this.checkedCollections[payload.themeCollection.theme.id]) || {
          featureColl: [],
          stacColl: {}
        };
        
        // If a stac item
        if (payload.stacItem) {
          checkedCollItem.stacColl[payload.stacItem.id] = payload.checkedValues;
        }

        else {
          checkedCollItem.featureColl = payload.checkedValues;
        }
        
        // Replace it
        this.checkedCollections[payload.themeCollection.theme.id] = checkedCollItem;
      },
      mapId
    );

    // Listen to the find features button
    this.cgpv.api.event.on(
      CLIP_ZIP_SHIP_FIND_FEATURES,
      (payload: object) => {
        //console.log("HANDLE API : CLIP_ZIP_SHIP_FIND_FEATURES", payload);
        // Start finding features
        this.startFindingFeatures(this.clipGeometry);
      },
      mapId
    );

    // Listen to the mouse over on
    this.cgpv.api.event.on(
      CLIP_ZIP_SHIP_FEATURE_HOVER_ON,
      (payload: object) => {
        //console.log("HANDLE API : CLIP_ZIP_SHIP_FEATURE_HOVER_ON", payload.feature);
        if (!payload.feature || !payload.feature.geometry) return;

        // Flush all geometries from vector geometries
        this.mapInstance.layer.vector.deleteGeometriesFromGroup(GEOMETRY_GROUP_HOVER);

        // Redirect
        this.projectAndAddToMap(payload.feature.geometry, {color: "red"}, GEOMETRY_GROUP_HOVER);
      },
      mapId
    );

    // Listen to the mouse over off
    this.cgpv.api.event.on(
      CLIP_ZIP_SHIP_FEATURE_HOVER_OFF,
      (payload: object) => {
        //console.log("HANDLE API : CLIP_ZIP_SHIP_FEATURE_HOVER_OFF", payload.feature);
        // Flush all geometries from vector geometries
        this.mapInstance.layer.vector.deleteGeometriesFromGroup(GEOMETRY_GROUP_HOVER);
      },
      mapId
    );

    // Listen to the map click event
    this.mapInstance.map.on('click', (e: any) => {
      console.log("map.click", this.clipLayer, this.flagJustDraggedVertex, e.latlng);
      if (this.flagJustDraggedVertex) return;

      // If current layer
      if (this.clipLayer && this.clipLayer.editor && this.clipLayer.editor.feature && this.clipLayer.editor.feature.editEnabled()) {
        this.clipLayer.editor.disable();
      }
    });

    // Listen to the map drawing start
    this.mapInstance.map.on('editable:drawing:start editable:dragstart editable:vertex:dragstart', (e) => {
      console.log("editable:drawing:start editable:vertex:dragstart", e.layer.editor.feature);

      // AOI has changed
      this.onAOIChanged(e.layer.editor.feature);
    });

    // Listen to the map drawing end
    this.mapInstance.map.on('editable:drawing:end', (e) => {
      console.log("editable:drawing:end", e.layer.editor.feature);

      // Reset cursor
      L.DomUtil.removeClass(this.mapInstance.map._container,'crosshair-cursor-enabled');

      // If a previous layer existed, remove it
      if (this.clipLayer)
        this.clipLayer.removeFrom(this.mapInstance.map);

      // If the double click zoom was enabled when the tool was activated
      if (this.doubleClickZoomEnabled) {
        // Wait and re enable the zoom on double click
        setTimeout(() => {
          // Make sure the double click to zoom is reenabled
          this.mapInstance.map.doubleClickZoom.enable();
        }, 500);
      }

      // If drawing a rectangle, skip this event, because CHANGED is also called by the Editable plugin
      //if (this.clipGeometryIsRectangle) return;
      
      // Process the geometry
      this.prepareGeometryFromPayload({
        geometry: e.layer.editor.feature,
        layer: e.layer
      });
    });
    
    // Listen to the vertex drag
    this.mapInstance.map.on('editable:vertex:dragend', (e) => {
      console.log("editable:vertex:dragend", e.layer.editor.feature);

      // If drew a rectangle
      this.flagJustDraggedVertex = true;
      // Wait and re enable the zoom on double click
      setTimeout(() => {
        // Make sure the double click to zoom is reenabled
        this.flagJustDraggedVertex = false;
      }, 200);

      // Process the geometry
      this.prepareGeometryFromPayload({
        geometry: e.layer.editor.feature,
        layer: e.layer
      });
    });

    // Listen to the geometry drag
    this.mapInstance.map.on('editable:dragend', (e) => {
      console.log("editable:dragend", e.layer.editor.feature);

      // Process the geometry
      this.prepareGeometryFromPayload({
        geometry: e.layer.editor.feature,
        layer: e.layer
      });
    });
  }

  onAOIChanged = (feature: object): void => {
    // Set color when AOI is edited
    feature.setStyle({color:"#3388ff"});

    // Emit that we've loaded new collections
    this.cgpv.api.event.emit({
      event: CLIP_ZIP_SHIP_GEOMETRY_CHANGED,
      handlerName: this.mapId,
      feature: feature
    });
  }

  prepareGeometryFromPayload = (payload: GeometryPayload): void => {
    console.log("prepareGeometryFromPayload", payload);

    this.clipGeometry = payload.geometry;
    this.clipLayer = payload.layer;

    // Wire a handler when the layer with the graphic is clicked
    if (this.clipLayer) {
      payload.layer.on('click', L.DomEvent.stop).on('click', payload.layer.toggleEdit);
    }
  }

  startFindingCollections = (geom: L.Layer): void => {    
    // Flush all geometries from vector geometries
    this.mapInstance.layer.vector.deleteGeometriesFromGroup(GEOMETRY_GROUP_FEATURES);

    // Find the collections
    this.findCollections(geom)
  };

  startFindingFeatures = (geom: L.Layer): void => {    
    // Flush all geometries from vector geometries
    this.mapInstance.layer.vector.deleteGeometriesFromGroup(GEOMETRY_GROUP_FEATURES);

    // Find the collections
    this.findFeaturesPerCollection(geom)
  };

  findCollections = (geom: L.Layer): void => {
    console.log("Find collections", geom);

    // Emit that we're loading the Clip Zip Ship
    this.cgpv.api.event.emit({
      event: CLIP_ZIP_SHIP_LOADING_SPINNER,
      handlerName: this.mapId,
      isLoading: true
    });

    // Get the collections for the bounding box
    this.mapInstance.getCollections(this.urlClip, geom, 4326).then((response: PyGeoAPICollectionsResponsePayload) => {
      // Only keep Feature types
      
      // Group the collections by themes
      this.themeColls = [];
      response.collections.forEach((collection: PyGeoAPICollectionsCollectionResponsePayload) => {
        // Find the theme
        let thmColl = this.themeColls.find((thmCol) => {
          return thmCol.theme.id == collection.theme;
        });

        // If not found
        if (!thmColl) {
          thmColl = new ThemeCollections({
            id: collection.theme,
            name: collection.theme
          }, [], []);
          this.themeColls.push(thmColl);
        }

        // If stac type
        if (collection.itemType == "stac" && collection.items) {
          // collection.items.forEach((itm) => {
          //   // Add the collection to the ThemeCollections
          //   thmColl.stacItems.push({
          //     id: itm.id,
          //     assets: itm.asset
          //   });  
          // });
        }

        else {
          // Add the collection to the ThemeCollections
          thmColl.collections.push({
            id: collection.id,
            type: collection.itemType,
            name: collection.title
          });
        }
      });

      // Only keep the themes with either collections or stac items
      this.themeColls = this.themeColls.filter((v) => {
        return v.collections.length > 0 || v.stacItems.length > 0;
      });

      // Emit that we're done loading
      this.cgpv.api.event.emit({
        event: CLIP_ZIP_SHIP_LOADING_SPINNER,
        handlerName: this.mapId,
        isLoading: false
      });

      // Emit that we've loaded new collections
      this.cgpv.api.event.emit({
        event: CLIP_ZIP_SHIP_LOADING_COLLECTIONS,
        handlerName: this.mapId,
        collections: this.themeColls,
        checkedCollections: this.checkedCollections
      });

      // Flush all geometries from vector geometries (just in case)
      this.mapInstance.layer.vector.deleteGeometriesFromGroup(GEOMETRY_GROUP_HOVER);

      // Update Graphics on Map based on UI
      //this.findFeaturesPerCollection(geom);
    });
  };

  findFeaturesPerCollection = (geom: L.Layer): void => {
    // Make sure the checked collections can only contain valid collections
    let actualCollections: Array<CollectionItem> = [];
    this.themeColls.forEach((thmColl: ThemeCollections) => {
      // If the collection is in the list of checked collections
      thmColl.collections.forEach((coll: CollectionItem) => {
        if (thmColl.theme.id in this.checkedCollections && this.checkedCollections[thmColl.theme.id].featureColl.includes(coll.id))
          actualCollections.push(coll);
      });
    });

    console.log("Finding features for", actualCollections);
    
    // Emit that we're loading the Clip Zip Ship
    this.cgpv.api.event.emit({
      event: CLIP_ZIP_SHIP_LOADING_SPINNER,
      handlerName: this.mapId,
      isLoading: true
    });

    // For each collection id
    let promises: Array<PyGeoAPIFeaturesResponsePayload> = [];
    actualCollections.forEach((coll: CollectionItem) => {
      // Depending on the collection
      if (coll.type == "feature") {
        // Get the features
        promises.push(this.mapInstance.getFeatures(this.urlFeaturesExtract, coll.id, geom, 4326));  
      }

      else if (coll.type == "coverage") {
        // Get the coverage
        promises.push(this.mapInstance.getFeatures(this.urlCoverageExtract, coll.id, geom, 4326));   
      }
    });

    // Once all queries have completed
    Promise.all(promises).then((featureColls: Array<PyGeoAPIFeaturesResponsePayload>) => {
      // Load on the UI
      this.loadOnUI(featureColls);

      // Load on the map
      this.loadOnMap(featureColls);

      // Emit that we're done loading
      this.cgpv.api.event.emit({
        event: CLIP_ZIP_SHIP_LOADING_SPINNER,
        handlerName: this.mapId,
        isLoading: false
      });
    });
  };

  loadOnUI = (featureColls: Array<PyGeoAPIFeaturesResponsePayload>): void => {
    // Emit that we've loaded new collections
    this.cgpv.api.event.emit({
      event: CLIP_ZIP_SHIP_LOADING_FEATURES,
      handlerName: this.mapId,
      data: featureColls
    });
  };

  loadOnMap = (featureColls: Array<PyGeoAPIFeaturesResponsePayload>): void => {
    //console.log("Load on map", featureColls);

    // For each feature collections
    featureColls.forEach((res) => {
      // If of type feature
      if (res.data.type == "FeatureCollection" && res.data.features) {
        // For each feature in the collection
        res.data.features.forEach((feat) => {
          if (feat.geometry) {
            // Redirect
            this.projectAndAddToMap(feat.geometry, {color: "#03F"}, GEOMETRY_GROUP_FEATURES);
          }
        });
      }
    });
  };

  projectAndAddToMap = (geometry: object, options: object, geometryGroup: string): L.Layer => {
    // Project the geometry to lat lng
    let geom = this.mapInstance.projectGeometryToLatLng(geometry);

    // Redirect
    return this.addToMap(geom, options, geometryGroup);
  };

  addToMap = (geometry: L.DivOverlay, options: object, geometryGroup: string): L.Layer => {
    // Depending on the geometry type
    if (geometry.type && geometry.type.toLowerCase() == "polyline") {
      // Add the polyline on the map
      let points: Array<L.LatLngExpression> = geometry.getLatLngs();
      let geom: L.Layer = this.mapInstance.layer.vector.addPolyline(points, options);
      return this.mapInstance.layer.vector.addToGeometryGroup(geom, geometryGroup);
    }

    else if (geometry.type && geometry.type.toLowerCase() == "marker") {
      // Add the marker on the map
      let point: L.LatLngExpression = geometry.getLatLng();
      let geom: L.Layer = this.mapInstance.layer.vector.addMarker(point.lat, point.lng, options);
      return this.mapInstance.layer.vector.addToGeometryGroup(geom, geometryGroup);
    }

    else if (geometry.type && geometry.type.toLowerCase() == "polygon") {
       // Add the polygon on the map
      let points: Array<L.LatLngExpression> = geometry.getLatLngs();
      let geom: L.Layer = this.mapInstance.layer.vector.addPolygon(points, options);
      return this.mapInstance.layer.vector.addToGeometryGroup(geom, geometryGroup); 
    }
  };

}
