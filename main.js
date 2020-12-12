const { connect } = require("http2");
let logger = require("./lib/logger");
let q = require("./lib/q")
let logo = `
 /$$      /$$  /$$$$$$  /$$$$$$$ 
| $$$    /$$$ /$$__  $$| $$__  $$
| $$$$  /$$$$| $$  \\__/| $$  \\ $$
| $$ $$/$$ $$|  $$$$$$ | $$$$$$$/
| $$  $$$| $$ \\____  $$| $$__  $$
| $$\\  $ | $$ /$$  \\ $$| $$  \\ $$
| $$ \\/  | $$|  $$$$$$/| $$  | $$
|__/     |__/ \\______/ |__/  |__/
`
let logo2 = ` _____ _           __                     __        _ _      _   _    _    
|_   _| |_  ___   / _|___ __ _ _ _   ___ / _|  __ _| | |  __| |_(_)__| |___
  | | | ' \\/ -_) |  _/ -_) _\` | '_| / _ \\  _| / _\` | | | (_-< / / / _\` (_-<
  |_| |_||_\\___| |_| \\___\\__,_|_|   \\___/_|   \\__,_|_|_| /__/_\\_\\_\\__,_/__/
`
function s(d) {
    v = Date.now();
    while(d+v>Date.now()) {}
}
async function main() {
    for(c of logo) {
        process.stdout.write(new logger.CON_RGBCOLOR(255,100,100).getStringInColor (c))
        s(1)
    }
    
    console.log(new logger.CON_RGBCOLOR(255,20,20).getStringInColor(logo2));
    let f = await q("Where is the file containing the byte array found at the top of the \"Payload\" file? An example can be found in example.txt. (Enter a path)")
    if (!require("fs").existsSync(f)) return logger.error("That file doesnt seem to exist.")
    let contents = require("fs").readFileSync(f).toString();
    contents = contents.replace("\n","")
    logger.info("Reading file...")
    if (!(contents.startsWith("{") && contents.endsWith("}"))) return logger.error("Are you sure that file contains the byte array and ONLY the byte array? The byte array has to be in its fullest, with the brackets around it.");
    logger.info("File passed check. Formatting file...")
    contents = contents.replace("{","");
    contents = contents.replace("}","");
    logger.info("Formatted file. Trying to parse...");
    let barray = contents.split(", ").map(a => (parseInt(a) || 0)).filter(a => a != 0).map(e => e & 255);
    s(1000)
    logger.info("Raw bytes: ")
    console.log(barray)
    barray = barray.map(a => String.fromCharCode(a));
    let raw = barray.join("");
    let v = raw.indexOf("tcp://");
    if (!v && v != 0) return logger.error("Found no valid tcp protocol url. Are you sure the array is complete?"); 
    let fst = raw.slice(v)
    fst = fst.replace("\n","")
    logger.success("Done! The address of the reverse stage should be somewhere in this string: ")
    console.dir(fst);
};

main();