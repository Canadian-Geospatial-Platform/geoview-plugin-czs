import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { ClipZipShip } from './ClipZipShip';

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

  /**
   * initialize the map after it has been loaded
   */
  useEffect(() => {
    cgpv.init(() => {
      // create a new component on the leaflet map after it has been rendered

      /**
       * First parameter is the id of that new component
       * the id can be used to remove the added component using the .removeComponent(id) function
       *
       * Second parameter is the component to add, this can be a react component written in JSX
       * or HTML created using React.createElement
       */
      cgpv.api.map('mapWM').addComponent('czs_comp', <ClipZipShip />);


      const button = {
          tooltip: 'Default',
          icon: 'details',
      };

      const panel = {
          title: 'Default',
          icon: 'details',
          content: '',
          width: 200,
      };
    });


    function addVectorMarkers(mapViewer) {
      mapViewer.layer.vector.addCircleMarker(56, -97, { radius: 1 }, 'CircleMarker-1');
      mapViewer.layer.vector.addCircle(57.7, -99, { radius: 10 }, 'Circle-1');
    }

  }, []);

  return (
    <div className={classes.container}>
      <div
        id="mapWM"
        className="llwp-map"
        style={{
          height: '100%',
        }}
        data-leaflet="{ 'name': 'Clip Zip Ship Map', 'projection': 3978, 'zoom': 13, 'center': [53.54, -113.35], 'language': 'en-CA', 'basemapOptions': { 'id': 'transport', 'shaded': false, 'labeled': true }, 'layers': [], 'extraOptions': { 'editable': true } }"
      ></div>
    </div>
  );
};

export default App;
