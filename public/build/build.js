/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// document.addEventListener(\"DOMContentLoaded\", () => { });\nwindow.addEventListener(\"load\", function (event) {\n    var calc = function (width, height, rows, cols) {\n        return {};\n    };\n    var width = 500;\n    var height = 500;\n    var childHeight = 100;\n    var childWidth = 100;\n    var body = document.querySelector('body');\n    var mainDiv = document.createElement('div');\n    mainDiv.style.width = width + \"px\";\n    mainDiv.style.height = height + \"px\";\n    mainDiv.style.background = \"#0ff\";\n    body.appendChild(mainDiv);\n    var wrapper = document.createElement('div');\n    wrapper.classList.add('game-wrapper');\n    for (var i = 0; i <= 9; i++) {\n        var elem = document.createElement('div');\n        elem.classList.add('child');\n        // elem.style.height = \n        wrapper.appendChild(elem);\n    }\n    body.appendChild(wrapper);\n});\nvar GradientType;\n(function (GradientType) {\n    GradientType[GradientType[\"LINEAR\"] = 1] = \"LINEAR\";\n    GradientType[GradientType[\"QUAD\"] = 2] = \"QUAD\";\n})(GradientType || (GradientType = {}));\nvar Level = /** @class */ (function () {\n    function Level(initOptions) {\n        // wyzerowac kontener z poprzednich danych\n        // odczytac w & h kontenera .elem\n        // stworzyc dzieci \n        // nalozyc gradient na dzieci\n        // zablokowac dzieci ktore sa w .blocked\n        // podpiac eventy do dziecki \n        // nasluchiwac na event zakoczenia levela\n    }\n    return Level;\n}());\nvar LevelManager = /** @class */ (function () {\n    function LevelManager() {\n    }\n    return LevelManager;\n}());\nvar App = /** @class */ (function () {\n    function App() {\n    }\n    return App;\n}());\nvar levelContainer = document.createElement('div');\nvar level_1 = new Level({\n    elem: levelContainer,\n    rows: 5,\n    cols: 3,\n    gradient: {\n        type: GradientType.LINEAR,\n        colors: [0xFFFFFFFF, 0xFF000000]\n    },\n    blocked: [0, 2, 3, 5, 6, 8],\n    onFinishedLevel: function () { }\n});\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });