"use strict";
(self["webpackChunkgeoview_loader"] = self["webpackChunkgeoview_loader"] || []).push([["geoview-layers-panel"],{

/***/ "../geoview-layers-panel/src/index.tsx":
/*!*********************************************!*\
  !*** ../geoview-layers-panel/src/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _panel_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panel-content */ "../geoview-layers-panel/src/panel-content.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "../../common/temp/node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");




/* eslint-disable @typescript-eslint/explicit-module-boundary-types */


var w = window;
/**
 * Create a class for the plugin instance
 */

var LayersPanelPlugin = /*#__PURE__*/function () {
  // id of the plugin
  // plugin properties
  // store the created button panel object
  function LayersPanelPlugin(id, props) {
    var _this = this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, LayersPanelPlugin);

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "translations", {
      "en-CA": {
        layersPanel: "Layers"
      },
      "fr-CA": {
        layersPanel: "Couches"
      }
    });

    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "added", function () {
      var _this$buttonPanel, _this$buttonPanel$pan;

      var mapId = _this.LayersPanelPluginProps.mapId; // access the cgpv object from the window object

      var cgpv = w["cgpv"]; // access the api calls

      var api = cgpv.api;

      var _api$map = api.map(mapId),
          language = _api$map.language; // button props


      var button = {
        id: "layersPanelButton",
        tooltip: _this.translations[language].layersPanel,
        tooltipPlacement: "right",
        icon: '<i class="material-icons">layers</i>',
        type: "textWithIcon"
      }; // panel props

      var panel = {
        title: _this.translations[language].layersPanel,
        icon: '<i class="material-icons">layers</i>',
        width: 200
      }; // create a new button panel on the appbar

      _this.buttonPanel = api.map(mapId).appBarButtons.createAppbarPanel(button, panel, null); // set panel content

      (_this$buttonPanel = _this.buttonPanel) === null || _this$buttonPanel === void 0 ? void 0 : (_this$buttonPanel$pan = _this$buttonPanel.panel) === null || _this$buttonPanel$pan === void 0 ? void 0 : _this$buttonPanel$pan.changeContent( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_panel_content__WEBPACK_IMPORTED_MODULE_3__["default"], {
        buttonPanel: _this.buttonPanel,
        mapId: mapId
      }));
    });

    this.id = id;
    this.LayersPanelPluginProps = props;
    this.buttonPanel = null;
  }
  /**
   * translations object to inject to the viewer translations
   */


  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(LayersPanelPlugin, [{
    key: "removed",
    value:
    /**
     * Function called when the plugin is removed, used for clean up
     */
    function removed() {
      var mapId = this.LayersPanelPluginProps.mapId; // access the cgpv object from the window object

      var cgpv = w["cgpv"]; // access the api calls

      var api = cgpv.api;

      if (this.buttonPanel) {
        api.map(mapId).appBarButtons.removeAppbarPanel(this.buttonPanel.id);
      }
    }
  }]);

  return LayersPanelPlugin;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayersPanelPlugin);
w["plugins"] = w["plugins"] || {};
w["plugins"]["layersPanel"] = LayersPanelPlugin;

/***/ }),

/***/ "../geoview-layers-panel/src/layer-stepper.tsx":
/*!*****************************************************!*\
  !*** ../geoview-layers-panel/src/layer-stepper.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "../../common/temp/node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");






var w = window;
/**
 * List of layer types and labels
 */

var layerOptions = [["esriDynamic", "ESRI Dynamic Service"], ["esriFeature", "ESRI Feature Service"], ["geoJSON", "GeoJSON"], ["ogcWMS", "OGC Web Map Service (WMS)"], ["xyzTiles", "XYZ Raster Tiles"]];
/**
 * Returns the appropriate error config for ESRI layer types
 *
 * @param type one of esriDynamic or esriFeature
 * @returns {EsriOptions} an error configuration object for populating dialogues
 */

var esriOptions = function esriOptions(type) {
  switch (type) {
    case "esriDynamic":
      return {
        err: "ESRI Map",
        capability: "Map"
      };

    case "esriFeature":
      return {
        err: "ESRI Feature",
        capability: "Query"
      };

    default:
      return {
        err: "",
        capability: ""
      };
  }
};
/**
 * A react component that displays the details panel content
 *
 * @returns {JSX.Element} A React JSX Element with the details panel
 */


var LayerStepper = function LayerStepper(_ref) {
  var mapId = _ref.mapId,
      setAddLayerVisible = _ref.setAddLayerVisible;
  var cgpv = w["cgpv"];
  var api = cgpv.api,
      react = cgpv.react,
      ui = cgpv.ui,
      mui = cgpv.mui;
  var useState = react.useState;
  var _ui$elements = ui.elements,
      Button = _ui$elements.Button,
      ButtonGroup = _ui$elements.ButtonGroup;
  var Stepper = mui.Stepper,
      Step = mui.Step,
      StepLabel = mui.StepLabel,
      StepContent = mui.StepContent,
      TextField = mui.TextField,
      Typography = mui.Typography,
      InputLabel = mui.InputLabel,
      FormControl = mui.FormControl,
      Select = mui.Select,
      MenuItem = mui.MenuItem;

  var _useState = useState(0),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
      activeStep = _useState2[0],
      setActiveStep = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
      layerURL = _useState4[0],
      setLayerURL = _useState4[1];

  var _useState5 = useState(""),
      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
      layerType = _useState6[0],
      setLayerType = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState7, 2),
      layerList = _useState8[0],
      setLayerList = _useState8[1];

  var _useState9 = useState(""),
      _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState9, 2),
      layerName = _useState10[0],
      setLayerName = _useState10[1];

  var _useState11 = useState(""),
      _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState11, 2),
      layerEntry = _useState12[0],
      setLayerEntry = _useState12[1];

  var useStyles = ui.makeStyles(function () {
    return {
      buttonGroup: {
        paddingTop: 12,
        gap: 6
      }
    };
  });
  var classes = useStyles();
  /**
   * Emits an error dialogue when a text field is empty
   *
   * @param textField label for the TextField input that cannot be empty
   */

  var emitErrorEmpty = function emitErrorEmpty(textField) {
    api.event.emit("snackbar/open", mapId, {
      message: {
        type: "string",
        value: "".concat(textField, " cannot be empty")
      }
    });
  };
  /**
   * Emits an error when the URL does not support the selected service type
   *
   * @param serviceName type of service provided by the URL
   */


  var emitErrorServer = function emitErrorServer(serviceName) {
    api.event.emit("snackbar/open", mapId, {
      message: {
        type: "string",
        value: "URL is not a valid ".concat(serviceName, " Server")
      }
    });
  };
  /**
   * Emits an error when a service does not support the current map projection
   *
   * @param serviceName type of service provided by the URL
   * @param proj current map projection
   */


  var emitErrorProj = function emitErrorProj(serviceName, proj) {
    api.event.emit("snackbar/open", mapId, {
      message: {
        type: "string",
        value: "".concat(serviceName, " does not support current map projection ").concat(proj)
      }
    });
  };
  /**
   * Using the layerURL state object, check whether URL is a valid WMS,
   * and add either Name and Entry directly to state if a single layer,
   * or a list of Names / Entries if multiple layer options exist.
   *
   * @returns {Promise<boolean>} True if layer passes validation
   */


  var wmsValidation = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var proj, wms, supportedProj, layers;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              proj = api.map(mapId).projection.getCRS().code;
              _context.prev = 1;
              _context.next = 4;
              return api.geoUtilities.getWMSServiceMetadata(layerURL, "");

            case 4:
              wms = _context.sent;
              supportedProj = wms.Capability.Layer.CRS;

              if (supportedProj.includes(proj)) {
                _context.next = 8;
                break;
              }

              throw "proj";

            case 8:
              layers = wms.Capability.Layer.Layer.map(function (x) {
                return [x.Name, x.Title];
              });

              if (layers.length === 1) {
                setLayerName(layers[0][1]);
                setLayerEntry(layers[0][0]);
              } else setLayerList(layers);

              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              if (_context.t0 == "proj") emitErrorProj("WMS", proj);else emitErrorServer("WMS");
              return _context.abrupt("return", false);

            case 16:
              return _context.abrupt("return", true);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 12]]);
    }));

    return function wmsValidation() {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * Using the layerURL state object, check whether URL is a valid ESRI Server,
   * and add either Name and Entry directly to state if a single layer,
   * or a list of Names / Entries if multiple layer options exist.
   *
   * @returns {Promise<boolean>} True if layer passes validation
   */


  var esriValidation = /*#__PURE__*/function () {
    var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(type) {
      var esri, layers;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return api.geoUtilities.getESRIServiceMetadata(layerURL);

            case 3:
              esri = _context2.sent;

              if (!esri.capabilities.includes(esriOptions(type).capability)) {
                _context2.next = 8;
                break;
              }

              if ("layers" in esri) {
                layers = esri.layers.map(function (_ref4) {
                  var id = _ref4.id,
                      name = _ref4.name;
                  return [String(id), name];
                });

                if (layers.length === 1) {
                  setLayerName(layers[0][1]);
                  setLayerEntry(layers[0][0]);
                } else setLayerList(layers);
              } else {
                setLayerName(esri.name);
                setLayerEntry(String(esri.id));
              }

              _context2.next = 9;
              break;

            case 8:
              throw "err";

            case 9:
              _context2.next = 15;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              emitErrorServer(esriOptions(type).err);
              return _context2.abrupt("return", false);

            case 15:
              return _context2.abrupt("return", true);

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 11]]);
    }));

    return function esriValidation(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  /**
   * Using the layerURL state object, check whether URL is a valid XYZ Server.
   *
   * @returns {boolean} True if layer passes validation
   */


  var xyzValidation = function xyzValidation() {
    var proj = api.map(mapId).projection.getCRS().code;
    var tiles = ["{x}", "{y}", "{z}"];

    for (var _i = 0, _tiles = tiles; _i < _tiles.length; _i++) {
      var tile = _tiles[_i];

      if (!layerURL.includes(tile)) {
        emitErrorServer("XYZ Tile");
        return false;
      }
    }

    if (proj !== "EPSG:3857") {
      emitErrorProj("XYZ Tiles", proj);
      return false;
    }

    return true;
  };
  /**
   * Using the layerURL state object, check whether URL is a valid GeoJSON.
   *
   * @returns {Promise<boolean>} True if layer passes validation
   */


  var geoJSONValidation = /*#__PURE__*/function () {
    var _ref5 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee3() {
      var response, json;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return fetch(layerURL);

            case 3:
              response = _context3.sent;
              _context3.next = 6;
              return response.json();

            case 6:
              json = _context3.sent;

              if (["FeatureCollection", "Feature"].includes(json.type)) {
                _context3.next = 9;
                break;
              }

              throw "err";

            case 9:
              _context3.next = 15;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              emitErrorServer("GeoJSON");
              return _context3.abrupt("return", false);

            case 15:
              return _context3.abrupt("return", true);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 11]]);
    }));

    return function geoJSONValidation() {
      return _ref5.apply(this, arguments);
    };
  }();
  /**
   * Handle the behavior of the 'Continue' button in the Stepper UI
   */


  var handleNext = /*#__PURE__*/function () {
    var _ref6 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee4() {
      var valid, name, url, entries, layerConfig;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(activeStep === 0)) {
                _context4.next = 3;
                break;
              }

              if (!(layerURL.trim() === "")) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", emitErrorEmpty("URL"));

            case 3:
              if (!(activeStep === 1)) {
                _context4.next = 35;
                break;
              }

              valid = true;

              if (!(layerType === "")) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", emitErrorEmpty("Service Type"));

            case 7:
              if (!(layerType === "ogcWMS")) {
                _context4.next = 13;
                break;
              }

              _context4.next = 10;
              return wmsValidation();

            case 10:
              valid = _context4.sent;
              _context4.next = 33;
              break;

            case 13:
              if (!(layerType === "xyzTiles")) {
                _context4.next = 17;
                break;
              }

              valid = xyzValidation();
              _context4.next = 33;
              break;

            case 17:
              if (!(layerType === "esriDynamic")) {
                _context4.next = 23;
                break;
              }

              _context4.next = 20;
              return esriValidation("esriDynamic");

            case 20:
              valid = _context4.sent;
              _context4.next = 33;
              break;

            case 23:
              if (!(layerType === "esriFeature")) {
                _context4.next = 29;
                break;
              }

              _context4.next = 26;
              return esriValidation("esriFeature");

            case 26:
              valid = _context4.sent;
              _context4.next = 33;
              break;

            case 29:
              if (!(layerType === "geoJSON")) {
                _context4.next = 33;
                break;
              }

              _context4.next = 32;
              return geoJSONValidation();

            case 32:
              valid = _context4.sent;

            case 33:
              if (valid) {
                _context4.next = 35;
                break;
              }

              return _context4.abrupt("return");

            case 35:
              if (!(activeStep === 2)) {
                _context4.next = 47;
                break;
              }

              name = layerName;
              url = layerURL;
              entries = layerEntry;
              if (layerType === "esriDynamic") url = api.geoUtilities.getMapServerUrl(layerURL);else if (layerType === "esriFeature") {
                url = api.geoUtilities.getMapServerUrl(layerURL) + "/" + layerEntry;
                entries = "";
              }

              if (!(layerName === "")) {
                _context4.next = 42;
                break;
              }

              return _context4.abrupt("return", emitErrorEmpty("Layer"));

            case 42:
              layerConfig = {
                name: name,
                type: layerType,
                url: url,
                entries: entries
              };
              api.map(mapId).layer.addLayer(layerConfig);
              setAddLayerVisible(false);
              handleInput({
                target: {
                  value: ""
                }
              });
              setActiveStep(-1);

            case 47:
              setActiveStep(function (prevActiveStep) {
                return prevActiveStep + 1;
              });

            case 48:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function handleNext() {
      return _ref6.apply(this, arguments);
    };
  }();
  /**
   * Handle the behavior of the 'Back' button in the Stepper UI
   */


  var handleBack = function handleBack() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep - 1;
    });
  };
  /**
   * Set layer URL from form input
   *
   * @param e TextField event
   */


  var handleInput = function handleInput(e) {
    setLayerURL(e.target.value);
    setLayerType("");
    setLayerList([]);
    setLayerName("");
    setLayerEntry("");
  };
  /**
   * Set layerType from form input
   *
   * @param e TextField event
   */


  var handleSelectType = function handleSelectType(e) {
    setLayerType(e.target.value);
    setLayerList([]);
    setLayerName("");
    setLayerEntry("");
  };
  /**
   * Set the layer name from form input
   *
   * @param e TextField event
   */


  var handleNameLayer = function handleNameLayer(e) {
    setLayerName(e.target.value);
  };
  /**
   * Set the currently selected layer from a list
   *
   * @param e Select event
   */


  var handleSelectLayer = function handleSelectLayer(e) {
    setLayerEntry(e.target.value);
    var name = layerList.find(function (x) {
      return x[0] === e.target.value;
    })[1];
    setLayerName(name);
  };
  /**
   * Creates a set of Continue / Back buttons
   *
   * @param param0 specify if button is first or last in the list
   * @returns {JSX.Element} React component
   */


  var NavButtons = function NavButtons(_ref7) {
    var _ref7$isFirst = _ref7.isFirst,
        isFirst = _ref7$isFirst === void 0 ? false : _ref7$isFirst,
        _ref7$isLast = _ref7.isLast,
        isLast = _ref7$isLast === void 0 ? false : _ref7$isLast;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(ButtonGroup, {
      className: classes.buttonGroup,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
          variant: "contained",
          type: "text",
          onClick: handleNext,
          children: isLast ? "Finish" : "Continue"
        }), !isFirst && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Button, {
          variant: "contained",
          type: "text",
          onClick: handleBack,
          children: "Back"
        })]
      })
    });
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Stepper, {
    activeStep: activeStep,
    orientation: "vertical",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Step, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StepLabel, {
        children: "Enter URL"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(StepContent, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TextField, {
          label: "URL",
          variant: "standard",
          value: layerURL,
          onChange: handleInput
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(NavButtons, {
          isFirst: true
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Step, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StepLabel, {
        children: "Select format"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(StepContent, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(FormControl, {
          fullWidth: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(InputLabel, {
            id: "service-type-label",
            children: "Service Type"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Select, {
            labelId: "service-type-label",
            value: layerType,
            onChange: handleSelectType,
            label: "Service Type",
            children: layerOptions.map(function (_ref8) {
              var _ref9 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref8, 2),
                  value = _ref9[0],
                  label = _ref9[1];

              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(MenuItem, {
                value: value,
                children: label
              }, value);
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(NavButtons, {})]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Step, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(StepLabel, {
        children: "Configure layer"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(StepContent, {
        children: [layerList.length === 0 && layerEntry === "" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TextField, {
          label: "Name",
          variant: "standard",
          value: layerName,
          onChange: handleNameLayer
        }), layerList.length === 0 && layerEntry !== "" && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Typography, {
          children: layerName
        }), layerList.length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(FormControl, {
          fullWidth: true,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(InputLabel, {
            id: "service-layer-label",
            children: "Select Layer"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(Select, {
            labelId: "service-layer-label",
            value: layerEntry,
            onChange: handleSelectLayer,
            label: "Select Layer",
            children: layerList.map(function (_ref10) {
              var _ref11 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref10, 2),
                  value = _ref11[0],
                  label = _ref11[1];

              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(MenuItem, {
                value: value,
                children: label
              }, value);
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(NavButtons, {
          isLast: true
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayerStepper);

/***/ }),

/***/ "../geoview-layers-panel/src/layers-list.tsx":
/*!***************************************************!*\
  !*** ../geoview-layers-panel/src/layers-list.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "../../common/temp/node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





/* eslint-disable react/no-array-index-key */
var w = window;
/**
 * A react component that will list the map server layers defined in the map config
 * @param {TypeLayersPanelListProps} props properties passed to the component
 * @returns {JSX.Element} a React JSX Element containing map server layers
 */

var LayersList = function LayersList(props) {
  var mapId = props.mapId,
      layers = props.layers,
      language = props.language;
  var cgpv = w["cgpv"];
  var mui = cgpv.mui,
      ui = cgpv.ui,
      react = cgpv.react,
      api = cgpv.api;
  var useState = react.useState,
      useEffect = react.useEffect;

  var _useState = useState(""),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
      selectedLayer = _useState2[0],
      setSelectedLayer = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
      layerLegend = _useState4[0],
      setLayerLegend = _useState4[1];

  var _useState5 = useState({}),
      _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
      layerOpacity = _useState6[0],
      setLayerOpacity = _useState6[1];

  var _useState7 = useState({}),
      _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState7, 2),
      layerVisibility = _useState8[0],
      setLayerVisibility = _useState8[1];

  var Slider = mui.Slider,
      Tooltip = mui.Tooltip,
      Checkbox = mui.Checkbox;
  var Button = ui.elements.Button;
  var translations = {
    "en-CA": {
      removeLayer: "Remove Layer",
      opacity: "Adjust Opacity",
      visibility: "Toggle Visibility"
    },
    "fr-CA": {
      removeLayer: "Supprimer la Couche",
      opacity: "Ajuster l'opacité",
      visibility: "Basculer la Visibilité"
    }
  };
  var useStyles = ui.makeStyles(function () {
    return {
      layersContainer: {
        overflow: "hidden",
        overflowY: "auto",
        width: "100%"
      },
      layerItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "5px 0",
        padding: "10px 5px",
        boxSizing: "content-box",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#c9c9c9"
        },
        zIndex: 1000,
        border: "none",
        width: "100%"
      },
      layerParentText: {
        fontSize: "16px",
        fontWeight: "bold"
      },
      layerCountTextContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "32px"
      },
      layerItemText: {
        fontSize: "14px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        marginLeft: "10px",
        display: "flex",
        alignItems: "center",
        gap: 6
      },
      layerItemGroup: {
        paddingBottom: 12
      },
      flexGroup: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "baseline"
      },
      slider: {
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20
      },
      removeLayerButton: {
        height: 38,
        minHeight: 38,
        width: 25,
        minWidth: 25,
        "& > div": {
          textAlign: "center"
        }
      }
    };
  });
  /**
   * Calls setLayerLegend for all layers
   */

  var setLayerLegends = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
      var _loop, _i, _Object$values;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _loop = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _loop() {
                var layer, dataUrl, name, legend, _legend, legendArray;

                return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function _loop$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        layer = _Object$values[_i];

                        if (!layer.getLegendGraphic) {
                          _context.next = 10;
                          break;
                        }

                        _context.next = 4;
                        return layer.getLegendGraphic();

                      case 4:
                        dataUrl = _context.sent;
                        name = layer.url.includes("/MapServer") ? layer.name : "";
                        legend = [{
                          name: name,
                          dataUrl: dataUrl
                        }];
                        setLayerLegend(function (state) {
                          return _objectSpread(_objectSpread({}, state), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, layer.id, legend));
                        });
                        _context.next = 16;
                        break;

                      case 10:
                        if (!layer.getLegendJson) {
                          _context.next = 16;
                          break;
                        }

                        _context.next = 13;
                        return layer.getLegendJson();

                      case 13:
                        _legend = _context.sent;
                        legendArray = Array.isArray(_legend) ? _legend : [_legend];
                        setLayerLegend(function (state) {
                          return _objectSpread(_objectSpread({}, state), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, layer.id, legendArray));
                        });

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _loop);
              });
              _i = 0, _Object$values = Object.values(layers);

            case 2:
              if (!(_i < _Object$values.length)) {
                _context2.next = 7;
                break;
              }

              return _context2.delegateYield(_loop(), "t0", 4);

            case 4:
              _i++;
              _context2.next = 2;
              break;

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));

    return function setLayerLegends() {
      return _ref.apply(this, arguments);
    };
  }();

  useEffect(function () {
    var defaultLegends = Object.values(layers).reduce(function (prev, curr) {
      return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, curr.id, []));
    }, {});
    setLayerLegend(function (state) {
      return _objectSpread(_objectSpread({}, defaultLegends), state);
    });
    setLayerLegends();
    var defaultSliders = Object.values(layers).reduce(function (prev, curr) {
      return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, curr.id, 100));
    }, {});
    setLayerOpacity(function (state) {
      return _objectSpread(_objectSpread({}, defaultSliders), state);
    });
    var defaultVisibility = Object.values(layers).reduce(function (prev, curr) {
      return _objectSpread(_objectSpread({}, prev), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, curr.id, true));
    }, {});
    setLayerVisibility(function (state) {
      return _objectSpread(_objectSpread({}, defaultVisibility), state);
    });
  }, [layers]);
  var classes = useStyles();
  /**
   * Sets the currently selected layer,
   * sets to blank if value is same as currently selecetd layer
   *
   * @param value layer button value
   */

  var _onClick = function onClick(value) {
    var selected = value !== selectedLayer ? value : "";
    setSelectedLayer(selected);
  };
  /**
   * Removes selcted layer from map
   *
   * @param layer layer config
   */


  var onRemove = function onRemove(layer) {
    return api.map(mapId).layer.removeLayer(layer);
  };
  /**
   * Adjusts layer opacity when slider is moved
   *
   * @param value slider opacity value (0-100)
   * @param data Layer data
   */


  var onSliderChange = function onSliderChange(value, data) {
    setLayerOpacity(function (state) {
      return _objectSpread(_objectSpread({}, state), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, data.id, value));
    });
    var opacity = layerVisibility[data.id] ? value / 100 : 0;
    data.setOpacity(opacity);
  };
  /**
   * Adjusts layer visibility when checkbox is toggled
   *
   * @param value checkbox boolean
   * @param data Layer data
   */


  var onCheckboxChange = function onCheckboxChange(value, data) {
    setLayerVisibility(function (state) {
      return _objectSpread(_objectSpread({}, state), {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, data.id, value));
    });
    var opacity = value ? layerOpacity[data.id] / 100 : 0;
    data.setOpacity(opacity);
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    className: classes.layersContainer,
    children: Object.values(layers).map(function (layer) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("button", {
          type: "button",
          className: classes.layerItem,
          onClick: function onClick() {
            return _onClick(layer.id);
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: classes.layerCountTextContainer,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: classes.layerItemText,
              title: layer.name,
              children: layer.name
            })
          })
        }), selectedLayer === layer.id && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
            className: classes.flexGroup,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Button, {
              className: classes.removeLayerButton,
              tooltip: translations[language].removeLayer,
              tooltipPlacement: "right",
              variant: "contained",
              type: "icon",
              icon: "<i class=\"material-icons\">remove</i>",
              onClick: function onClick() {
                return onRemove(layer);
              }
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: classes.flexGroup,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Tooltip, {
              title: translations[language].opacity,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("i", {
                className: "material-icons",
                children: "contrast"
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
              className: classes.slider,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Slider, {
                size: "small",
                value: layerOpacity[layer.id],
                valueLabelDisplay: "auto",
                onChange: function onChange(e) {
                  return onSliderChange(e.target.value, layer);
                }
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Tooltip, {
              title: translations[language].visibility,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Checkbox, {
                checked: layerVisibility[layer.id],
                onChange: function onChange(e) {
                  return onCheckboxChange(e.target.checked, layer);
                }
              })
            })]
          }), layerLegend[layer.id].map(function (layer, index) {
            var _layer$drawingInfo, _layer$drawingInfo2, _layer$drawingInfo3, _layer$drawingInfo4, _layer$drawingInfo5, _layer$drawingInfo6, _layer$drawingInfo7, _layer$drawingInfo8;

            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: classes.layerItemGroup,
              children: [layer.legend && Object.values(layer.legend).length > 1 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: classes.layerItemText,
                title: layer.layerName,
                children: layer.layerName
              }), ((_layer$drawingInfo = layer.drawingInfo) === null || _layer$drawingInfo === void 0 ? void 0 : _layer$drawingInfo.renderer.type) === "simple" && ((_layer$drawingInfo2 = layer.drawingInfo) === null || _layer$drawingInfo2 === void 0 ? void 0 : _layer$drawingInfo2.renderer.symbol.imageData) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: classes.layerItemText,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: "data:".concat((_layer$drawingInfo3 = layer.drawingInfo) === null || _layer$drawingInfo3 === void 0 ? void 0 : _layer$drawingInfo3.renderer.symbol.contentType, ";base64,").concat((_layer$drawingInfo4 = layer.drawingInfo) === null || _layer$drawingInfo4 === void 0 ? void 0 : _layer$drawingInfo4.renderer.symbol.imageData)
                }), ((_layer$drawingInfo5 = layer.drawingInfo) === null || _layer$drawingInfo5 === void 0 ? void 0 : _layer$drawingInfo5.renderer.label) || layer.name]
              }), ((_layer$drawingInfo6 = layer.drawingInfo) === null || _layer$drawingInfo6 === void 0 ? void 0 : _layer$drawingInfo6.renderer.type) === "uniqueValue" && ((_layer$drawingInfo7 = layer.drawingInfo) === null || _layer$drawingInfo7 === void 0 ? void 0 : _layer$drawingInfo7.renderer.uniqueValueInfos[0].symbol.imageData) && ((_layer$drawingInfo8 = layer.drawingInfo) === null || _layer$drawingInfo8 === void 0 ? void 0 : _layer$drawingInfo8.renderer.uniqueValueInfos.map(function (uniqueValue, index) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: classes.layerItemText,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                    src: "data:".concat(uniqueValue.symbol.contentType, ";base64,").concat(uniqueValue.symbol.imageData)
                  }), uniqueValue.label]
                }, index);
              })), layer.legend && layer.legend.map(function (uniqueValue, index) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  className: classes.layerItemText,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                    src: "data:".concat(uniqueValue.contentType, ";base64,").concat(uniqueValue.imageData)
                  }), uniqueValue.label || layer.layerName]
                }, index);
              }), layer.dataUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: classes.layerItemText,
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: layer.dataUrl
                }), layer.name]
              })]
            }, index);
          })]
        })]
      }, layer.id);
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LayersList);

/***/ }),

/***/ "../geoview-layers-panel/src/panel-content.tsx":
/*!*****************************************************!*\
  !*** ../geoview-layers-panel/src/panel-content.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../common/temp/node_modules/.pnpm/@babel+runtime@7.17.2/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _layer_stepper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer-stepper */ "../geoview-layers-panel/src/layer-stepper.tsx");
/* harmony import */ var _layers_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layers-list */ "../geoview-layers-panel/src/layers-list.tsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "../../common/temp/node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }






var w = window;
/**
 * A react component that displays the details panel content
 *
 * @param {TypePanelContentProps} props the properties of the pane content
 * @returns {JSX.Element} A React JSX Element with the details panel
 */

var PanelContent = function PanelContent(props) {
  var mapId = props.mapId;
  var cgpv = w["cgpv"];
  var api = cgpv.api,
      react = cgpv.react,
      ui = cgpv.ui;
  var useState = react.useState,
      useEffect = react.useEffect;

  var _useState = useState(false),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
      addLayerVisible = _useState2[0],
      setAddLayerVisible = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
      mapLayers = _useState4[0],
      setMapLayers = _useState4[1];

  var Button = ui.elements.Button;

  var _api$map = api.map(mapId),
      language = _api$map.language;

  var translations = {
    "en-CA": {
      addLayer: "Add Layer"
    },
    "fr-CA": {
      addLayer: "Ajouter Couche"
    }
  };
  var useStyles = ui.makeStyles(function () {
    return {
      mainContainer: {
        display: "flex",
        flexDirection: "row"
      },
      addLayerButton: {
        width: 50,
        minWidth: 50,
        "& > div": {
          textAlign: "center"
        }
      }
    };
  });
  var classes = useStyles();

  var onClick = function onClick() {
    return setAddLayerVisible(function (state) {
      return !state;
    });
  };

  useEffect(function () {
    setMapLayers(function () {
      return _objectSpread({}, api.map(mapId).layer.layers);
    });
    api.event.on(api.eventNames.EVENT_LAYER_ADDED, function () {
      return setMapLayers(function () {
        return _objectSpread({}, api.map(mapId).layer.layers);
      });
    }, mapId);
    api.event.on(api.eventNames.EVENT_REMOVE_LAYER, function () {
      return setMapLayers(function () {
        return _objectSpread({}, api.map(mapId).layer.layers);
      });
    }, mapId);
    return function () {
      api.event.off(api.eventNames.EVENT_LAYER_ADDED, mapId);
      api.event.off(api.eventNames.EVENT_REMOVE_LAYER, mapId);
    };
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: classes.mainContainer,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Button, {
        className: classes.addLayerButton,
        tooltip: translations[language].addLayer,
        tooltipPlacement: "right",
        variant: "contained",
        type: "icon",
        icon: "<i class=\"material-icons\">add</i>",
        onClick: onClick
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      style: {
        display: addLayerVisible ? "inherit" : "none"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_layer_stepper__WEBPACK_IMPORTED_MODULE_2__["default"], {
        mapId: mapId,
        setAddLayerVisible: setAddLayerVisible
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      style: {
        display: addLayerVisible ? "none" : "inherit"
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_layers_list__WEBPACK_IMPORTED_MODULE_3__["default"], {
        mapId: mapId,
        layers: mapLayers,
        language: language
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PanelContent);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("../../common/temp/node_modules/.pnpm/webpack-dev-server@4.7.4_webpack-cli@4.9.2+webpack@5.70.0/node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&reconnect=10"), __webpack_exec__("../../common/temp/node_modules/.pnpm/webpack@5.70.0_webpack-cli@4.9.2/node_modules/webpack/hot/dev-server.js"), __webpack_exec__("../geoview-layers-panel/src/index.tsx"));
/******/ }
]);
//# sourceMappingURL=geoview-layers-panel.js.map