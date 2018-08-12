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

eval("// document.addEventListener(\"DOMContentLoaded\", () => { });\nwindow.addEventListener(\"load\", function (event) {\n    var width = 500;\n    var height = 450;\n    var body = document.querySelector('body');\n    var mainDiv = document.createElement('div');\n    mainDiv.style.width = width + \"px\";\n    mainDiv.style.height = height + \"px\";\n    mainDiv.style.background = \"#0ff\";\n    mainDiv.style.marginBottom = \"20px\";\n    mainDiv.style.cssFloat = \"left\";\n    mainDiv.style.background = \"transparent\";\n    // mainDiv.style.background = `linear-gradient(180deg, #fff, #FF1122, #000, #FF9955, #fff)`\n    body.appendChild(mainDiv);\n    var wrapper = document.createElement('div');\n    wrapper.style.width = width + \"px\";\n    wrapper.style.height = height + \"px\";\n    wrapper.style.position = \"relative\";\n    wrapper.style.cssFloat = \"left\";\n    wrapper.classList.add('game-wrapper');\n    body.appendChild(wrapper);\n    var _colors = [0xFFFFFF, 0xFF1122, 0x000000, 0xFF9955, 0xFFFFFF];\n    var level_1 = new Level({\n        elem: wrapper,\n        rows: 5,\n        cols: 3,\n        gradient: {\n            type: GradientType.LINEAR,\n            colors: _colors,\n            angleDeg: 180\n        },\n        blocked: [0, 2, 3, 5, 6, 8],\n        onFinishedLevel: function () { }\n    });\n    var canvas = document.createElement('canvas');\n    canvas.style.width = width + \"px\";\n    canvas.style.height = height + \"px\";\n    canvas.style.position = \"absolute\";\n    canvas.style.top = \"0px\";\n    canvas.style.left = \"0px\";\n    canvas.style.zIndex = \"100\";\n    canvas.width = width;\n    canvas.height = height;\n    wrapper.appendChild(canvas);\n    var context = canvas.getContext('2d');\n    var childHeight = height / (_colors.length - 1);\n    context.fillStyle = \"rgba(100, 100, 255, 1)\";\n    for (var i = 0; i < _colors.length; i++) {\n        context.fillRect(0, (childHeight * i) - 1, width, 2);\n    }\n});\nvar GradientType;\n(function (GradientType) {\n    GradientType[GradientType[\"LINEAR\"] = 1] = \"LINEAR\";\n    GradientType[GradientType[\"QUAD\"] = 2] = \"QUAD\";\n})(GradientType || (GradientType = {}));\nvar Level = /** @class */ (function () {\n    function Level(initOptions) {\n        this.parentElement = null;\n        this.childrens = [];\n        // wyzerowac kontener z poprzednich danych\n        this.parentElement = initOptions.elem;\n        this.clearParentElement();\n        // odczytac w & h kontenera .elem\n        this.readContainerSize();\n        // stworzyc dzieci \n        this.rows = initOptions.rows;\n        this.cols = initOptions.cols;\n        this.createMainChildCanvas();\n        this.createChildrens();\n        // nalozyc gradient na dzieci\n        // this.gradient = initOptions.gradient;\n        // this.fillChildrendWithGradient();\n        // zablokowac dzieci ktore sa w .blocked\n        // podpiac eventy do dziecki \n        // nasluchiwac na event zakoczenia levela\n    }\n    Level.prototype.createMainChildCanvas = function () {\n        var mainChildCanvas = document.createElement('canvas');\n        mainChildCanvas.width = this.parentWidth;\n        mainChildCanvas.height = this.parentHeight;\n        mainChildCanvas.style.opacity = \"1\";\n        mainChildCanvas.style.position = \"absolute\";\n        mainChildCanvas.style.top = \"0px\";\n        mainChildCanvas.style.left = \"-501px\";\n        mainChildCanvas.style.zIndex = \"0\";\n        var mainChildCanvasCTX = mainChildCanvas.getContext('2d');\n        // get angle from bottom left to top right\n        var pheta = Math.atan2(-mainChildCanvas.height, mainChildCanvas.width);\n        // get the length of the line from bottom right to diagonal line we got the ang of.\n        // dont need the abd but cant be bothered explaining why its negative \n        var AB = Math.abs(mainChildCanvas.height * Math.cos(pheta));\n        // get vector at 90 deg from found angle\n        var xdx = Math.cos(pheta + Math.PI / 2);\n        var xdy = Math.sin(pheta + Math.PI / 2);\n        // from the center C of rectangle move AB dist back and forward to find points E and D\n        var x1 = mainChildCanvas.width / 2 - xdx * AB;\n        var y1 = mainChildCanvas.height / 2 - xdy * AB;\n        var x2 = mainChildCanvas.width / 2 + xdx * AB;\n        var y2 = mainChildCanvas.height / 2 + xdy * AB;\n        // let length = mainChildCanvas.height + 150;\n        // let angle = 45;\n        // let x1 = 0;\n        // let y1 = 0;\n        // let x2 = length * Math.cos(angle);  // angle in radians\n        // let y2 = length * Math.sin(angle);  // angle in radians\n        // mainChildCanvas.height\n        var gradient = mainChildCanvasCTX.createLinearGradient(x1, y1, x2, y2);\n        gradient.addColorStop(0, '#fff');\n        gradient.addColorStop(0.5, '#0ff');\n        gradient.addColorStop(0.9, '#bada55');\n        gradient.addColorStop(1, '#000000');\n        mainChildCanvasCTX.fillStyle = gradient;\n        mainChildCanvasCTX.fillRect(0, 0, mainChildCanvas.width, mainChildCanvas.height);\n        this.parentElement.appendChild(mainChildCanvas);\n        this.mainChildCanvas = mainChildCanvas;\n    };\n    Level.prototype.createChildrens = function () {\n        var iterateCount = this.rows * this.cols;\n        var childHeight = Math.ceil(this.parentHeight / this.rows);\n        var childWidth = Math.ceil(this.parentWidth / this.cols);\n        for (var i = 0; i < iterateCount; i++) {\n            var child = document.createElement('div');\n            child.style.background = \"transparent\";\n            child.style.width = childWidth + \"px\";\n            child.style.height = childHeight + \"px\";\n            child.style.position = \"absolute\";\n            child.style.zIndex = \"0\";\n            var currentRow = Math.floor(i / this.cols);\n            var top_1 = childHeight * currentRow;\n            child.style.top = top_1 + \"px\";\n            var curretCol = Math.floor(i % this.cols);\n            var left = childWidth * curretCol;\n            child.style.left = left + \"px\";\n            var childCanvas = document.createElement('canvas');\n            childCanvas.width = childWidth;\n            childCanvas.height = childHeight;\n            var childCTX = childCanvas.getContext('2d');\n            childCTX.drawImage(this.mainChildCanvas, left, top_1, childWidth, childHeight, 0, 0, childWidth, childHeight);\n            child.appendChild(childCanvas);\n            this.parentElement.appendChild(child);\n            this.childrens.push(child);\n        }\n    };\n    // fillChildrendWithGradient(){\n    //     // interface IGradient {\n    //     //     type: GradientType,\n    //     //     colors: Array<number>,\n    //     //     angleDeg: number \n    //     // }\n    //     const hexToRgb = (hex:number) => {\n    //         var r = (hex >> 16) & 255;\n    //         var g = (hex >> 8) & 255;\n    //         var b = hex & 255;\n    //         return r + \",\" + g + \",\" + b;\n    //     }\n    //     const calculateRgbByPercentage = (colorStart:number, colorEnd:number, percentage:number) =>{\n    //         let r_start = (colorStart >> 16) & 255;\n    //         let g_start = (colorStart >> 8) & 255;\n    //         let b_start = colorStart & 255;\n    //         let r_end = (colorEnd >> 16) & 255;\n    //         let g_end = (colorEnd >> 8) & 255;\n    //         let b_end = colorEnd & 255;\n    //         let r_finish = r_start + ((r_end - r_start) * percentage);\n    //         let g_finish = g_start + ((g_end - g_start) * percentage);\n    //         let b_finish = b_start + ((b_end - b_start) * percentage);\n    //         console.log('COLOR R', r_start, r_end, r_finish) \n    //         console.log('COLOR G', g_start, g_end, g_finish) \n    //         console.log('COLOR B', b_start, b_end, b_finish)\n    //         console.log('COLOR %', percentage)\n    //         return `rgb(${r_finish},${g_finish},${b_finish})`;\n    //     }\n    //     const calculateCssColor = (y:number) => {\n    //         let containerHeight:number = this.parentHeight\n    //         let colorHeight:number = containerHeight / (this.gradient.colors.length - 1);\n    //         let gradientColorIndexStart:number = Math.floor(y / colorHeight); \n    //         let gradientColorIndexEnd:number = gradientColorIndexStart + 1;\n    //         if(gradientColorIndexEnd >= this.gradient.colors.length){\n    //             gradientColorIndexEnd = gradientColorIndexStart; \n    //             gradientColorIndexStart = gradientColorIndexStart - 1; \n    //         }\n    //         let gradientColorStart = this.gradient.colors[gradientColorIndexStart];\n    //         let gradientColorEnd = this.gradient.colors[gradientColorIndexEnd];\n    //         let colorStartHeight = gradientColorIndexStart * colorHeight;\n    //         let percentageColorStart = (y - colorStartHeight) / colorHeight;\n    //         let diffHeightInPx =  colorHeight - (y - colorStartHeight);  \n    //         console.log('KOLORY', hexToRgb(gradientColorStart), hexToRgb(gradientColorEnd))\n    //         console.log(\"%%\", percentageColorStart, y, colorStartHeight, colorHeight, gradientColorIndexStart);\n    //         let cssColorFinish = calculateRgbByPercentage(gradientColorStart, gradientColorEnd, percentageColorStart);\n    //         return {\n    //             css: cssColorFinish,\n    //             gradientColorIndexStart: gradientColorIndexStart,\n    //             gradientColorIndexEnd: gradientColorIndexEnd,\n    //             diffHeightInPx: diffHeightInPx,\n    //         }\n    //     }\n    //     if(this.gradient.type == GradientType.LINEAR){\n    //         let cssGradientType = \"linear-gradient\";\n    //         let cssAngleDeg = `${this.gradient.angleDeg}deg`;\n    //         for(let i:number = 0, child; child = this.childrens[i]; i++){\n    //             let { top, left, width, height } = child.style;\n    //             let x1:number = parseInt(left, 10);\n    //             let y1:number = parseInt(top, 10);\n    //             let x2:number = parseInt(left, 10) + parseInt(width, 10);\n    //             let y2:number = parseInt(top, 10) + parseInt(height, 10);\n    //             console.log('---WIERSZ', i)\n    //             let colStart = calculateCssColor(y1);\n    //             let colEnd = calculateCssColor(y2);\n    //             console.log('-- ',i,  colStart, colEnd);\n    //             // let indexAmount = colEnd.gradientColorIndexEnd - colStart.gradientColorIndexStart;\n    //             // let containerHeight:number = this.parentHeight\n    //             // let colorHeight:number = containerHeight / (this.gradient.colors.length - 1);\n    //             // let aa = colorHeight / containerHeight;\n    //             let percentageStart = 0;\n    //             if(i == 0){\n    //                 // percentageStart = colStart.diffHeightInPx / parseInt(height, 10) - 100;  \n    //             }else{\n    //                 // percentageStart = colStart.diffHeightInPx / parseInt(height, 10) - 100;  \n    //             }\n    //             percentageStart = colStart.diffHeightInPx / parseInt(height, 10);  \n    //             let percentageCss = (percentageStart) ? percentageStart + \"%\": \"\"\n    //             let cssColors = `${colStart.css} ${percentageCss}, `;\n    //             for(let j = colStart.gradientColorIndexEnd; j < colEnd.gradientColorIndexEnd; j++){\n    //                 // let percentageCurrent:number = colStart.diffHeightInPx / parseInt(height, 10) - 100;  \n    //                 // console.log('------------- co mamy w przesunieciu?', percentageCurrent, colStart.diffHeightInPx, parseInt(height, 10));\n    //                 // Wys = wysokosc przesuniecia wzgledem poczatku kolor w px\n    //                 // ProcentPrzesuniecia = cala wysokosc bloku pojedycznego / Wys\n    //                 let currentColor = this.gradient.colors[j];\n    //                 cssColors += `rgb(${hexToRgb(currentColor)}), `\n    //             }\n    //             cssColors += `${colEnd.css}`;\n    //             console.log(' ?? ', i, cssColors);\n    //             let cssBackground = `${cssGradientType}(${cssAngleDeg}, ${cssColors})`\n    //             console.log('co wyszlo?', cssBackground, cssAngleDeg)                \n    //             child.style.background = cssBackground;   \n    //             child.style.border = \"1px solid #0FF\"; \n    //             child.style.boxSizing = \"border-box\";\n    //         }\n    //     }\n    // }\n    // createChildrens(){\n    //     let iterateCount = this.rows * this.cols;\n    //     let childHeight = this.parentHeight / this.rows;\n    //     let childWidth = this.parentWidth / this.cols;\n    //     for(let i:number = 0; i < iterateCount; i++){\n    //         let child = document.createElement('div');\n    //         child.style.background = \"#0ff\";\n    //         child.style.width = `${childWidth}px`;\n    //         child.style.height = `${childHeight}px`;\n    //         child.style.position = \"absolute\";\n    //         let currentRow = Math.floor(i / this.cols);\n    //         let top = childHeight * currentRow;\n    //         child.style.top = `${top}px`;\n    //         let curretCol = Math.floor(i % this.cols);\n    //         let left = childWidth * curretCol;\n    //         child.style.left = `${left}px`;\n    //         this.parentElement.appendChild(child);\n    //         this.childrens.push(child);\n    //     }\n    // }\n    Level.prototype.readContainerSize = function () {\n        this.parentHeight = this.parentElement.clientHeight;\n        this.parentWidth = this.parentElement.clientWidth;\n    };\n    Level.prototype.clearParentElement = function () {\n        this.parentElement.innerHTML = \"\";\n    };\n    return Level;\n}());\nvar LevelManager = /** @class */ (function () {\n    function LevelManager() {\n    }\n    return LevelManager;\n}());\nvar App = /** @class */ (function () {\n    function App() {\n    }\n    return App;\n}());\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });