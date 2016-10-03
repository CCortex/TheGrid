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