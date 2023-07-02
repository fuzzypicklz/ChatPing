// This is where all the file IO stuff will happen.
function checkForFile(){
    // see if the file exists or not
    if(FileLib.exists('./config/triggerList.cfg')){
        return true
    }
    else{
        FileLib.write('./config/triggerList.cfg');
    }
    
}

function addText(text){
    // append text to the file
    let triggersArray = FileLib.read('./config/triggerList.cfg').toString().split("^&$");

    FileLib.append('./config/triggerList.cfg', text + "^&$");
}

function remove(index){
    // convert the file to an array, then remove index "index" from it
    let triggersArray = FileLib.read('./config/triggerList.cfg').toString().split("^&$");

    triggersArray.splice(index, 1)
    let weirdCSV = triggersArray.join("^&$");
    FileLib.delete('./config/triggerList.cfg');
    FileLib.write('./config/triggerList.cfg', weirdCSV);

}

function wipe(){
    // delete all data on the file
    FileLib.delete('./config/triggerList.cfg');
    FileLib.write('./config/triggerList.cfg');
}

function fileToArray(){
    //converts it to an array, then returns it. simple.
    let triggersArray = FileLib.read('./config/triggerList.cfg').toString().split("^&$");

    return triggersArray;
}