/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Grid = __webpack_require__(1);
	Square = __webpack_require__(2);

	function main(inBrowser = 0) {
	    var TheGrid = new Grid(5);
	    TheGrid.F2();
	    TheGrid.PrintGrid();
	    console.log('-----');
	    TheGrid.PrintGridContact();

	    if (inBrowser == 1) {
	        var GridCanvas = document.getElementById('graphicGrid');
	        // Check the element is in the DOM and the browser supports canvas
	        if (GridCanvas.getContext) {
	            // Initaliase a 2-dimensional drawing context
	            var ctx = GridCanvas.getContext('2d');
	            ctx.lineWidth = 1;
	            TheGrid.PrintInCanvas(ctx, GridCanvas.width, GridCanvas.height);

	            //Draw the grid skeleton
	            var xstep = GridCanvas.width / TheGrid.factorGrid;
	            var ystep = GridCanvas.height / TheGrid.factorGrid;
	            for (let x = xstep; x < GridCanvas.width; x += xstep) {
	                ctx.moveTo(x, 0);
	                ctx.lineTo(x, GridCanvas.width);
	                ctx.stroke();
	            }
	            for (let y = ystep; y < GridCanvas.height; y += ystep) {
	                ctx.moveTo(0, y);
	                ctx.lineTo(GridCanvas.height, y);
	                ctx.stroke();
	            }
	        }
	    }
	}

	if (typeof window === 'undefined') {
	    main();
	} else {
	    window.onload = main(1);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Represents the grid.
	 * The grid is composed of squares.
	 */
	class Grid {
	    /**
	     * Grid Constructor - The grid is an Array of squares, it would be easier to use a 2D array for this task but using a 1D array is better in terms of performance (faster).
	     * @constructor
	     * @param {int} factor - Factor for the square number in the grid, ex : factor = 5, 5 * 5 = 25 squares
	     */
	    constructor(factor) {
	        this.grid = new Array();
	        this._factorGrid = factor;
	        var ArraySize = this.factorGrid * this.factorGrid;
	        for (let i = 0; i < ArraySize; i++) {
	            this.grid.push(new Square(this.F1(), 0));
	        }
	    }

	    /**
	     * Accessor for factorGrid
	     * @AccessorFactorGrid
	     */
	    set factorGrid(factorGrid) { this._factorGrid = factorGrid; }
	    get factorGrid() { return this._factorGrid; }

	    /**
	     * F1 - Gives a state to a square (Function given in the test)
	     * @F1
	     * @return {int} state for the square - 1 or 0
	     */
	    F1() {
	        return (Math.floor(Math.random() * 3) + 1) > 1 ? 1 : 0;
	    }

	    /**
	     * F2 - Heart of the app, this is where the algorithm is.
	     * Square's color will be set correctly after calling this method
	     * @F2
	     */
	    F2() {
	        for (let x = 0; x < this.grid.length; x += this.factorGrid) {
	            for (let y = 0; y < this.factorGrid; y++) {
	                if (this.grid[x + y].state == 1) {
	                    var contact = 0;
	                    var idx = x + y;

	                    //Check  x - 1
	                    if (x == 0 && (idx > 0) && this.grid[idx - 1].state == 1) {
	                        ++contact;
	                    } else if (x > 0 && idx > x && this.grid[idx - 1].state == 1) {
	                        ++contact;
	                    }

	                    //Check x + 1
	                    if (idx < (((x / this.factorGrid) * this.factorGrid) + (this.factorGrid - 1)) && idx < (this.grid.length - 1) && this.grid[idx + 1].state == 1) {
	                        ++contact;
	                    }

	                    //Check y - 1
	                    if (x > 0 && this.grid[idx - this.factorGrid].state == 1) {
	                        ++contact;
	                    }

	                    //Check y + 1   idx < (this.grid.length - this.factorGrid)
	                    if (x < (this.factorGrid * (this.factorGrid - 1)) && this.grid[idx + this.factorGrid].state == 1) {
	                        ++contact;
	                    }

	                    this.grid[idx].contact = contact;
	                }
	            }
	        }
	    }

	    /**
	     * PrintGrid - Method outputting the square's state in the console
	     * @PrintGrid
	     */
	    PrintGrid() {
	        console.log("- Grid state -");
	        for (let y = 0; y < this.grid.length; y += this.factorGrid) {
	            var ln = '';
	            for (let x = 0; x < this.factorGrid; x++) {
	                ln += this.grid[x + y].state == 1 ? '[1]' : '[0]';
	            }
	            console.log(ln);
	        }
	    }

	    /**
	     * PrintGridContact - Method outputting the square's contact in the console
	     * @PrintGridContact
	     */
	    PrintGridContact() {
	        console.log("- Grid contact -");
	        for (let y = 0; y < this.grid.length; y += this.factorGrid) {
	            var ln = '';
	            for (let x = 0; x < this.factorGrid; x++) {
	                ln += '[' + this.grid[x + y].contact + ']';
	            }
	            console.log(ln);
	        }
	    }

	    /**
	     * PrintInCanvas - Method outputting the grid in the canvas
	     * @PrintInCanvas
	     * @param {int} ctx - Context of the canvas
	     * @param {int} width - Width of the canvas
	     * @param {int} height - Height of the canvas
	     */
	    PrintInCanvas(ctx, width = 100, height = 100) {
	        if (ctx === undefined) {
	            return;
	        }
	        if (width < 100) {
	            width = 100;
	        }
	        if (height < 100) {
	            height = 100;
	        }

	        var widthSquare = width / this.factorGrid;
	        var heightSquare = height / this.factorGrid;

	        //Draw the grid with the right color
	        for (let y = 0, yd = 0; y < this.grid.length; y += this.factorGrid, yd += heightSquare) {
	            for (let x = 0, xd = 0; x < this.factorGrid; x++, xd += widthSquare) {
	                ctx.fillStyle = this.grid[x + y].colorRGB;
	                ctx.fillRect(xd, yd, widthSquare, heightSquare);
	            }
	        }
	    }
	}

	var grid = Grid;
	module.exports = grid;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Represents the dictionnary for the translation between the contact and the color
	 */
	var contactColorDic = {};

	contactColorDic[0] = "rgb(255, 255, 255)";
	contactColorDic[1] = "rgb(0, 255, 0)";
	contactColorDic[2] = "rgb(200, 0, 200)";
	contactColorDic[3] = "rgb(255, 132, 0)";
	contactColorDic[4] = "rgb(255, 0, 0)";

	/**
	 * Represents a Square.
	 */
	class Square {
	    /**
	     * Square Constructor
	     * @constructor
	     * @param {int} state - State of the square : active or inactive
	     * @param {int} contact - Number of contact with other Squares
	     */
	    constructor(state, contact) {
	        this._state = state;
	        this._contact = contact;
	        this._colorRGB = "rgb(0, 0, 0)";
	    }

	    /**
	     * Accessor for state
	     * @AccessorState
	     */
	    set state(state) { this._state = state; }
	    get state() { return this._state; }

	    /**
	     * Accessor for contact
	     * @AccessorContact
	     */
	    set contact(contact) {
	        this._contact = contact;
	        this.ContactToRGB();
	    }
	    get contact() { return this._contact; }

	    /**
	     * Accessor for colorRGB
	     * @AccessorColorRGB
	     */
	    set colorRGB(color) { this._colorRGB = colorRGB; }
	    get colorRGB() { return this._colorRGB; }

	    /**
	     * ContactToRGB - Translate contact of square to the correct RGB color. If the Square is active but with no contact with other squares, the color is white instead of black for the inactive.
	     * @ContactToRGB
	     */
	    ContactToRGB() {
	        this._colorRGB = contactColorDic[this._contact];
	    }
	}

	var square = Square;
	module.exports = square;

/***/ }
/******/ ]);