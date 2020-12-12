class RGBCOLOR {
    /**
     * A new RGB color
     * @param {Number} r COLOR: RED
     * @param {Number} g COLOR: GREEN
     * @param {Number} b COLOR: BLUE
     */
    constructor(r,g,b) {
        if (isNaN(r) || isNaN(g) || isNaN(b)) return console.error("R, G and B need to be numbers")
        if ((r>255||r<0)||(g>255||g<0)||(b>255||b<0)) return console.error("R, G and B need to be under 255 and above 0")
        this.r = r;
        this.g = g;
        this.b = b;
    }
    getStringInColor(text) {
        return `\x1b[38;2;${this.r};${this.g};${this.b}m${text}[0m`;
    }
}

const defaultConfig = {
    success: {
        prefix: "[ OK ]",
        prefixColor: new RGBCOLOR(0,255,0),
        textColor: new RGBCOLOR(0,200,0)
    },
    warn: {
        prefix: "[ !! ]",
        prefixColor: new RGBCOLOR(255, 186, 59),
        textColor: new RGBCOLOR(255, 232, 59)
    },
    info: {
        prefix: "[INFO]",
        prefixColor: new RGBCOLOR(59, 255, 137),
        textColor: new RGBCOLOR(133, 252, 255)
    },
    error: {
        prefix: "[ !! ]",
        prefixColor: new RGBCOLOR(252, 38, 38),
        textColor: new RGBCOLOR(255, 167, 79)
    }
}

class Logger {
    static config = defaultConfig;
    static success(text) {
        console.log(`${this.config.success.prefixColor.getStringInColor(this.config.success.prefix)} ${this.config.success.textColor.getStringInColor(text)}`)
    }
    static warn(text) {
        console.log(`${this.config.warn.prefixColor.getStringInColor(this.config.warn.prefix)} ${this.config.warn.textColor.getStringInColor(text)}`)
    }
    static info(text) {
        console.log(`${this.config.info.prefixColor.getStringInColor(this.config.info.prefix)} ${this.config.info.textColor.getStringInColor(text)}`)
    }
    static error(text) {
        console.log(`${this.config.info.prefixColor.getStringInColor(this.config.error.prefix)} ${this.config.error.textColor.getStringInColor(text)}`)
    }
    static get CON_RGBCOLOR() {
        return RGBCOLOR;
    }
}
module.exports = Logger;