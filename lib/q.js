const { stdin, stdout } = require("process")

module.exports=function(t) {
    return new Promise((r)=>{
        let lg = require("./logger")
        t = new lg.CON_RGBCOLOR(200,255,200).getStringInColor(t);
        let a = require("readline").createInterface(stdin,stdout);
        a.question(t+"\n> ",(v)=>{
            a.close();
            r(v)
        })
    })
}