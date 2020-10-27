mp.Player.prototype.setGlowColor = function(red, green, blue) {
    if (!Number.isInteger(red) || !Number.isInteger(green) || !Number.isInteger(blue)) {
        throw new TypeError("Non number argument(s) passed to setGlowColor.");
    }

    if ((red < 0 || red > 255) || (green < 0 || green > 255) || (blue < 0 || blue > 255)) {
        throw new RangeError("Invalid red/green/blue value(s) passed to setGlowColor.");
    }

    this.setVariable("__glowColor", {
        red: red / 255.0,
        green: green / 255.0,
        blue: blue / 255.0
    });
};

mp.Player.prototype.getGlowColor = function() {
    const data = this.getVariable("__glowColor");
    if (data) {
        return {
            red: data.red * 255.0,
            green: data.green * 255.0,
            blue: data.blue * 255.0
        };
    }

    return null;
};

mp.Player.prototype.resetGlowColor = function() {
    this.setVariable("__glowColor", null);
};