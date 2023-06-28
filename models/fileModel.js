// This is where all the file IO stuff will happen.
const fs = require('fs');


function checkForFile(){
    // see if the file exists or not
    fs.open('./config/triggerList.cfg').toString();
}

function addText(text){
    // append text to the file
    let triggersArray = fs.readFile('./config/triggerList.cfg').toString().split("^&$");

    triggersArray.append(text);
    let weirdCSV = triggersArray.join("^&$");
    fs.unlink('./config/triggerList.cfg');
    fs.writeFile('./config/triggerList.cfg', weirdCSV);
}

function remove(index){
    // convert the file to an array, then remove index "index" from it
    let triggersArray = fs.readFile('./config/triggerList.cfg').toString().split("^&$");

    triggersArray.splice(index, 1)
    let weirdCSV = triggersArray.join("^&$");
    fs.unlink('./config/triggerList.cfg');
    fs.writeFile('./config/triggerList.cfg', weirdCSV);

}

function wipe(){
    // delete all data on the file
    fs.unlink('./config/triggerList.cfg');
    fs.writeFile('./config/triggerList.cfg', "");
}

function fileToArray(){
    //converts it to an array, then returns it. simple.
    let triggersArray = fs.readFile('./config/triggerList.cfg').toString().split("^&$");

    return triggersArray;
}


module.exports = {
    checkForFile,
    addText,
    remove,
    wipe,   
    fileToArray
}