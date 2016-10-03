Grid = require('./grid.js');
Square = require('./square.js');

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