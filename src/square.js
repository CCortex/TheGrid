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