import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ClipZipShipAPI } from './ClipZipShipAPI';

/**
 * Main container and map styling
 */
const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
  }
}));

// get reference to window object
const w = window as any;

// get reference to geoview apis
const cgpv = w['cgpv'];

/**
 * Create a container containing a leaflet map using the GeoView viewer
 *
 * @returns {JSX.Elemet} the element that creates the container and the map
 */
const App = (): JSX.Element => {

  // Get the classes for the styles
  const classes = useStyles();

  let clipZipShipAPI = null;

  /**
   * initialize the map after it has been loaded
   */
  useEffect(() => {
    cgpv.init(() => {
      // create a new component on the leaflet map after it has been rendered

      // Some variables
      const MAP_ID = "mapWM";
      const URL_CLIP = "http://10.68.130.170:8080/processes/clip-process/execution";
      const URL_EXTRACT = "http://10.68.130.170:8080/processes/extract-process/execution";


      // Get the Map instance
      const mapInstance = cgpv.api.map(MAP_ID);

      // Button props
      const button = mapInstance.getButtonProps("clipZipShipButton", "Clip Zip Ship", "dynamic_form" );

      // Panel props
      const panel = mapInstance.getPanelProps("clipZipShipPanel", "Clip Zip Ship", "dynamic_form")

      // Create a new button panel on the appbar
      const buttonPanel = cgpv.api.map(MAP_ID).appBarButtons.createAppbarPanel(button, panel, null);

      // Create the ClipZipShip
      clipZipShipAPI = new ClipZipShipAPI(MAP_ID, URL_CLIP, URL_EXTRACT);

      // Set panel content
      buttonPanel.panel?.changeContent(clipZipShipAPI.clipZipShip);

      // Open it by default
      buttonPanel.panel?.open();

      // Load the layers panel plugin
      cgpv.api.addPlugin('layersPanel', MAP_ID, w.plugins['layersPanel'], { mapId: MAP_ID });
    });
  }, []);

  return (
    <div className={classes.container}>
      <div
        id="mapWM"
        className="llwp-map"
        style={{
          height: '100%',
        }}
        data-leaflet="{
          'name': 'Clip Zip Ship Map',
          'zoom': 13,
          'projection': 3978,
          'center': [53.54, -113.35],
          'language': 'en-CA',
          'basemapOptions': {
            'id': 'transport',
            'shaded': false,
            'labeled': true
          },
          'layers': [{
            'id':'wmsLYR1',
            'name': 'Première Nation / First Nation',
            'url': 'https://services.aadnc-aandc.gc.ca/geomatics/services/Donnees_Ouvertes-Open_Data/Premiere_Nation_First_Nation/MapServer/WMSServer',
            'type': 'ogcWMS',
            'entries': '0'
          },{
            'id':'wmsLYR2',
            'name': 'Energy Dynamic',
            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer',
            'type': 'esriDynamic',
            'entries': '4, 5, 10'
          },{
            'id':'wmsLYR3',
            'name': 'Energy Feature',
            'url': 'https://geoappext.nrcan.gc.ca/arcgis/rest/services/NACEI/energy_infrastructure_of_north_america_en/MapServer/1',
            'type': 'esriFeature'
          }],
          'extraOptions': {
            'editable': true
          },
          'plugins': []
        }"
      ></div>
    </div>
  );

  /*{
    'id':'wmsLYR4',
    'name': 'Topographic OSM WMS',
    'url': 'https://maps-cartes.services.geo.ca/server_serveur/services/NRCan/CanEcumeneV2_en/MapServer/WMSServer',
    'type': 'ogcWMS',
    'entries': '0,1,2,3,4,5,6,7,8,9'
  }
  */
};

export default App;
