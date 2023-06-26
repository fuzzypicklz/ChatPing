// This is where all the file IO stuff will happen.



function checkForFile(dataFile){
    // see if the file exists or not
    try {
        // try to open the file
    } catch (error) { // see if it's a file not found error
        // make a new file
    }
}

function addText(text, dataFile){
    // append text to the file
}

function remove(index, dataFile){
    // convert the file to an array, then remove index "index" from ti
}

function wipe(dataFile){
    // delete all data on the file
}

function display(dataFile){
    // take all the data from the file, put it into an array, then map that array into the chat
}

function fileToArray(dataFile){
    //converts it to an array, then returns it. simple.
}


module.exports = {
    checkForFile,
    addText,
    remove,
    wipe,   
    display,
    fileToArray
}